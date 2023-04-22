interface HeadingProps {
  title: string
  subtitle?: string
  center?: boolean
}

const Heading: React.FC<HeadingProps> = ({title, subtitle, center}) => {
  return ( <div style={{textAlign: center ? 'center' : 'start'}}>
    <div className="title-modal">
      {title}
    </div>
    <div className="subtitle-modal">
      {subtitle}
    </div>
  </div> );
}

export default Heading;