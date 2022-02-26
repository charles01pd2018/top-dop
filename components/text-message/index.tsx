
interface Props {
    id: string;
    className?: string;
}

const TextMessage = ( {
    id,
    className='',
}: Props ) => {

    const classes = `
        sent-msg
        ${className}
    `;

    return (
        <section id={id} className={classes}>
            Text Message
        </section>
    )
}

export default TextMessage;