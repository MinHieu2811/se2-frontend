import React from 'react'

type Props = {
    title: string
}

function Helmet({title}: Props) {

    document.title = title;

    React.useEffect(() => {
        window.scrollTo(0, 0);
    })

    return (
        <>
            
        </>
    )
}

export default Helmet