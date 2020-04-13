window.onload = function () {
    fetch('Timezones.txt')
        .then(response => response.text())
        .then(text => {
            const timeZoneList = text.split("\n");
            timeZoneList.forEach(timeZone => {
                timeZone = timeZone.trim();
                const timeZoneElement = document.createElement('option');
                timeZoneElement.value = timeZone;
                timeZoneElement.innerText = timeZone;
                document.querySelector('#TimeZoneId').append(timeZoneElement)
            })
        })
    setLoadingState(true);
    
    GetQueries();
}

async function GetTimeFromRequestedTimeZone() {
    try {
        setLoadingState(true);

        const response = await fetch("http://localhost:58600/api/currenttime", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "TimeZoneId": document.querySelector('#TimeZoneId').value })
        });
        
        const json = await response.json()
        
        await GetQueries();
        
        document.querySelector('#output').innerText = `Current time in ${json.timeZone}: ${new Date(json.time).toLocaleString()}`;


    } catch (error) {
        console.log(error);
        setLoadingState(false);
    }
}

async function GetQueries() {
    try {               
        const response = await fetch("http://localhost:58600/api/alltimes", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json()

        //  Deletes table entries each time function is called so when new query 
        //  is appended no duplicate entries are displayed

        while (document.querySelectorAll('#queries tr').length > 1) {
            document.querySelector('#queries').deleteRow(1)
        }

        //  Queries stored in database in chronological order but displayed 
        //  in reverse chronological order for convenience
        //  New html tr created for each query from array of queries in database
        //  Each td html element corresponds to index in keys array         

        json.data.reverse().forEach(query => {
            const tr = document.createElement('tr');
            const keys = ['currentTimeQueryId', 'time', 'clientIp', 'utcTime', 'timeZone']
            let td1, td2, td3, td4, td5;

            [td1, td2, td3, td4, td5].forEach((tdElement, i) => {
                tdElement = document.createElement('td');

                //  Adds the property(keys[i]) of query object to the inner text of each td html element
                tdElement.innerText =
                    ((keys[i] === 'time') || (keys[i] === 'utcTime'))
                        ? new Date(query[keys[i]]).toLocaleString()
                        : query[keys[i]];
                tr.append(tdElement)
            });

            document.querySelector('#queries').append(tr);
        });
        setLoadingState(false);        
    }
    catch (error) {
        console.log(error);
        setLoadingState(false);        
    }    
}

function setLoadingState(isLoading) {
    if (isLoading) {
        document.querySelector('#getTime').disabled = true;
        document.querySelector('#loading').style.display = 'block';
        document.querySelector('#output').style.display = 'none';
    }
    else {
        document.querySelector('#getTime').disabled = false;
        document.querySelector('#loading').style.display = 'none';
        document.querySelector('#output').style.display = 'block';
    }    
}



