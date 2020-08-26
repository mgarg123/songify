export default function durationToTime(duration) {
    let durations = parseInt(duration)
    let min = Math.floor(durations / 60)
    let finalMin = min < 10 ? '0' + min : min + ""
    let seconds = Math.floor(durations % 60)
    let finalSeconds = seconds < 10 ? '0' + seconds : seconds + ""

    return finalMin + ":" + finalSeconds

}