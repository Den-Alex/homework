import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import Greeting from './Greeting'
import HW3, {UserType} from './HW3'

type GreetingContainerPropsType = {
    users: Array<UserType> // need to fix any
    addUserCallback: (name: string) => void // need to fix any
}


// ДАВАЙТЕ ПРОСЛЕДИМ БОЕВОЙ ПУТЬ addUser:
// ОТСЮДА ОН ВСПЛЫВЕТ В КОМПОНЕНТЕ GreetingContainer И ВЫЗОВЕТ pureAddUser->
// А В pureAddUser ЛИБО ВЫДАСТ ОШИБКУ (ЕСЛИ ПУСТОЙ name) ИЛИ ЗАПУТСИТ addUserCallback->
// КОТОРЫЙ ВСПЛЫВЕТ В КОМПОНЕНТЕ <HW3/> И ВЫЗОВЕТ pureAddUserCallback->
// КОТОРЫЙ СОЗДАСТ НОВЫЙ ОБЪЕКТ И ЗАСЕТАЕТ ЕГО В users НЕ ПОТЕРЯВ И СТАРЫХ ЮЗЕРОВ

export const pureAddUser = (name: string, setError: (error: string) => void, setName: (name: string) => void, addUserCallback: (name: string) => void) => {
    if (name.trim()) {
        addUserCallback(name)
        setName("")
    } else {
        setError('Ошибка! Введите имя!')
    }
    // если имя пустое - показать ошибку, иначе - добавить юзера и очистить инпут
}

export const pureOnBlur = (name: string, setError: (error: string) => void) => { // если имя пустое - показать ошибку
    if (!name.trim()) {
        setError('Ошибка! Введите имя!')
    }
}

export const pureOnEnter = (e: KeyboardEvent<HTMLInputElement>, addUser: () => void) => { // если нажата кнопка Enter - добавить
    if (e.key === "Enter") {
        addUser()
    }
}

// более простой и понятный для новичков
// function GreetingContainer(props: GreetingPropsType) {

// более современный и удобный для про :)
const GreetingContainer: React.FC<GreetingContainerPropsType> = ({
                                                                     users,
                                                                     addUserCallback,
                                                                 }) => {
    // деструктуризация пропсов
    const [name, setName] = useState<string>('') // need to fix any
    const [error, setError] = useState<string>('') // need to fix any

    const setNameCallback = (e: ChangeEvent<HTMLInputElement>) => { // need to fix any
        setName(e.currentTarget.value)// need to fix
        error && setError('')
    }
    const addUser = () => {
        // console.log('1')
        pureAddUser(name, setError, setName, addUserCallback)
    }

    const onBlur = () => {
        pureOnBlur(name, setError)
    }

    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        pureOnEnter(e, addUser)
    }

    const totalUsers = users.length// need to fix
    const lastUserName = users[totalUsers - 1]?.name  // name is not a this array // need to fix  ////??????????????????????????????????????????

    return (
        <Greeting
            name={name}
            setNameCallback={setNameCallback}
            addUser={addUser}
            onBlur={onBlur}
            onEnter={onEnter}
            error={error}
            totalUsers={totalUsers}
            lastUserName={lastUserName}
        />
    )
}

export default GreetingContainer


