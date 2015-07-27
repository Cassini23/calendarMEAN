/**
 * Created by nina on 6/26/15.
 */

var CLIENT_ID = '465620177785-srtugv2vvsh8ma4t5kce0coddjcnf4l0.apps.googleusercontent.com';

var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];


/**
 * Check if current user has authorized this application.
 */

/*window.onload =  loadScript;

function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "https://apis.google.com/js/client.js?onload=checkAuth";
    //script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' +
    //'&signed_in=true&callback=initialize';
    document.body.appendChild(script);
}*/



function checkAuth(){
    console.log('On callback');
    gapi.auth.authorize(
        {
            'client_id': CLIENT_ID,
            'scope': SCOPES,
            'immediate': true
        }, handleAuthResult);
}
/*
function checkAuth() {
    console.log('On callback');
    gapi.auth.authorize(
        {
            'client_id': CLIENT_ID,
            'scope': SCOPES,
            'immediate': false
        }, handleAuthResult);
}*/

/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(authResult) {
    console.log(authResult);
    //var authorizeDiv = document.getElementById('authorize-div');
    if (authResult && !authResult.error) {
        alert('Authorized');
        // Hide auth UI, then load client library.
      //  authorizeDiv.style.display = 'none';
        loadCalendarApi();
    }
}

/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 */
function handleAuthClick(event) {
    gapi.auth.authorize(
        {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
        handleAuthResult);
    return false;
}

/**
 * Load Google Calendar client library. List upcoming events
 * once client library is loaded.
 */
function loadCalendarApi() {
    console.log('Loading calendar API   ');
    gapi.client.load('calendar', 'v3', listUpcomingEvents);
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
    console.log('Creating requests and then listing out the events');
    var request = gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
    });

    request.execute(function(resp) {
        var events = resp.items;
        appendPre('Upcoming events:');

        if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
                var event = events[i];
                var when = event.start.dateTime;
                if (!when) {
                    when = event.start.date;
                }
                appendPre(event.summary + ' (' + when + ')')
            }
        } else {
            appendPre('No upcoming events found.');
        }

    });
}

/**
 * Append a pre element to the body containing the given message
 * as its text node.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
    var div = document.getElementById('output');
    var textContent = document.createTextNode(message + '\n');
    div.appendChild(textContent);
}