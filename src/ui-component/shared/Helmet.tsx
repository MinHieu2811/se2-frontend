import React from 'react'

type Props = {
    title: string
}

function Helmet({title}: Props) {

    document.title = title;

    React.useEffect(() => {
        window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window?.location?.pathname])

    return null
}

export default Helmet