import tinycolor from 'tinycolor2'

export default function isColorDark(colors) {
    let finalColors = ""
    let count = 0
    for (let i in colors) {
        if (count < 2) {
            let color = tinycolor(colors[i])
            if (color.isLight) {
                finalColors += color.brighten(5).toString() + ","
                count++
            }
        } else {
            break;
        }
    }
    count = 0;
    for (let i in colors) {
        if (count < 2) {
            let color = tinycolor(colors[i])
            if (color.isDark) {
                finalColors += color.darken(10).toString() + ","
                count++
            }
        } else {
            break;
        }

    }
    return finalColors;
}