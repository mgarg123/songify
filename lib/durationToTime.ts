
export default function durationToTime(duration: string): String {
    let durations: number = parseInt(duration)
    let min: number = Math.floor(durations / 60)
    let finalMin: String = min < 10 ? '0' + min : min + ""
    let seconds: number = Math.floor(durations % 60)
    let finalSeconds: String = seconds < 10 ? '0' + seconds : seconds + ""

    return finalMin + ":" + finalSeconds

}