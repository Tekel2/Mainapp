

export  const FormatDate = (data) => {
    var datte = new Date(data)
    let dateTimeString =
        datte.getDate() +
        '/' +
        (datte.getMonth() + 1) +
        '/' +         
        datte.getFullYear()
    
    return dateTimeString; // It will look something like this 3-5-2021 16:23
}; 