import Image from 'next/image';

const Logo = () => {

    return (
        <section className='logo'>
            <Image width={400} height={400} 
                src='/static/images/logo.png' />
        </section>
    )
}

export default Logo;