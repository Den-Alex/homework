import React from 'react'
import iconA from '../c10-SuperSort/iconA.png'
import iconMen from '../c10-SuperSort/iconMen.png'
import iconV from '../c10-SuperSort/iconV.png'

// добавить в проект иконки и импортировать
// const downIcon = '[\\/]'
// const upIcon = '[/\\]'
// const noneIcon = '[--]'
const downIcon = iconA
const upIcon = iconMen
const noneIcon = iconV

export type SuperSortPropsType = {
    id?: string
    sort: string
    value: string
    onChange: (newSort: string) => void
}

export const pureChange = (sort: string, down: string, up: string) => {
    if (sort === down) { // если текущая сортировка по убыванию
        return up; // меняем на сортировку по возрастанию
    } else if (sort === up) { // если текущая сортировка по возрастанию
        return ''; // сбрасываем сортировку
    } else { // если сортировка не задана
        return down; // задаем сортировку по убыванию
    }
};

// export const pureChange = (sort: string, down: string, up: string) => {
//     // пишет студент, sort: (click) => down (click) => up (click) => '' (click) => down ...
//     return up // исправить
// }

const SuperSort: React.FC<SuperSortPropsType> = (
    {
        sort, value, onChange, id = 'hw15',
    }
) => {
    const up = '0' + value
    const down = '1' + value

    const onChangeCallback = () => {
        onChange(pureChange(sort, down, up))
    }

    // const icon = sort === down
    //     ? downIcon
    //     : sort === up
    //         ? upIcon
    //         : noneIcon

    const icon =
        sort === down
            ? (downIcon)
            : sort === up
                ? (upIcon)
                : (noneIcon);
    return (
        <span
            id={id + '-sort-' + value}
            onClick={onChangeCallback}
        >
            сделать иконку
            <img
                id={id + '-icon-' + sort}
                src={icon}
            />

            {/*{icon} /!*а это убрать*!/*/}
        </span>
    )
}

export default SuperSort
