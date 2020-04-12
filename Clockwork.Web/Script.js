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
document.querySelector('#getTime').disabled = true;
document.querySelector('#loading').style.display = 'block';
document.querySelector('#queries').style.display = 'none';
GetQueries();



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

        document.querySelector('#loading').style.display = 'none'
        await GetQueries();
        

    } catch (error) {
        console.log(error)
    }
}



async function GetQueries() {    
    try {
        document.querySelector('#getTime').disabled = false;
        document.querySelector('#loading').style.display = 'none';
        document.querySelector('#queries').style.display = 'block';
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



