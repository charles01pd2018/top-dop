import Image from 'next/image';

const Logo = () => {

    return (
        <section className='logo'>
            <Image width={512} height={256} 
                src='/static/images/banner.png' />
        </section>
    )
}

export default Logo;