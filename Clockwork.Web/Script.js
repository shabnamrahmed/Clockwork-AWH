async function GetTimeFromRequestedTimeZone() {
    try {
        const response = await fetch("http://localhost:58600/api/currenttime", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "TimeZoneId": document.querySelector('#TimeZoneId').value })
        });
        const json = await response.json()
        document.querySelector('#output').innerText = `Current time in ${json.timeZone}: ${new Date(json.time).toLocaleString()}`;

        await GetQueries();

    } catch (error) {
        console.log(error)
    }
}

GetQueries();

async function GetQueries() {    
    try {
       
        const response = await fetch("http://localhost:58600/api/alltimes", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json()
        while (document.querySelectorAll('#queries tr').length > 1) {
            document.querySelector('#queries').deleteRow(1)
        }
        json.data.reverse().forEach(query => {
            const tr = document.createElement('tr');
            const keys = ['currentTimeQueryId', 'time', 'clientIp', 'utcTime', 'timeZone']
            let td1, td2, td3, td4, td5;
            
            [td1, td2, td3, td4, td5].forEach((tdElement, i) => {
                tdElement = document.createElement('td');
                tdElement.innerText =
                    ((keys[i] === 'time') || (keys[i] === 'utcTime'))
                        ? new Date(query[keys[i]]).toLocaleString()
                        : query[keys[i]];
                tr.append(tdElement)
            });
            
            document.querySelector('#queries').append(tr);
        });
    }
    catch (error) {
        console.log(error)
    }
}

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

