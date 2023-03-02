import React from 'react'

type Props = {
    col: number
    mdCol?: number
    smCol?: number
    gap?: number
    children: JSX.Element
}

const Grid = ({col, mdCol, smCol, gap, children}: Props) => {
    const style = {
        gap: gap ? `${gap}px` : '0'
    }

    const column = col ? `grid-col-${col}` : ''
    const mdColumn = mdCol ? `grid-col-md-${mdCol}` : ''
    const smColumn = smCol ? `grid-col-sm-${smCol}` : ''

    return (
        <div className={`grid ${column} ${mdColumn} ${smColumn}`} style={style}>
            {children}
        </div>
    )
}

export default Grid