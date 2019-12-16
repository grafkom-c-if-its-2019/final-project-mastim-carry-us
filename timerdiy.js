console.log('loaded');
var cancelled;
var kalah = 0;
// set seconds
var secs;
// calculate the seconds (don't change this! unless time progresses at a different speed for you...)
var milsecs;
var dispsec, dispmil;

function Decrement() {
    if (cancelled) {
        cancelled = 0;
        return;
    }
    seconds = dispsec;
    milseconds = dispmil;
        // if less than a minute remaining
    if (milseconds < 1000) {
        milseconds.value = milsecs;
    } else {
        dispsec = getseconds();
        // console.log(dispsec)
        dispsec = getmilseconds();
        // dispmil = getmilseconds();
        // console.log(dispsec)
    }
    milsecs-=4;
    if(!(milsecs < 0))
    {
        setTimeout('Decrement()',1);
    }
    else {
        kalah = 1;
        kalahalert();
        // console.log('CHECKPOINT')
    }
}
function kalahalert() {
    if(kalah == 1) {
        alert("RAN for your life!");
        document.location.reload();
        score = 0;
        kalah = 0;
    }
}

function countdown() {
    secs = 6;
    milsecs = secs * 1000;
    setTimeout('Decrement()',1);
}

function getseconds() {
    // minutes is seconds divided by 60, rounded down
    secs = Math.floor(milsecs / 1000);
    return secs;
}

function getmilseconds() {
    // take mins remaining (as seconds) away from total seconds remaining
    return milsecs-Math.round(secs *1000);
}

function change() {
    console.log('sek hop setop')

    cancelled = 1;
    // cancelled = 0;
    countdown();
}

document.addEventListener("keydown", function(){ change(); }, false);
