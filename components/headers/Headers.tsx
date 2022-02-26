// partials
import { Text } from 'elements';

/* TYPES */
interface HeaderContent {
    text: string;
}

interface HeaderProps {
    id: string;
    className?: string;
    content: HeaderContent;
}

const Header = ( { 
    id,
    className='',
    content: {
        text
    }
}: HeaderProps ) => {

    /* CLASSNAMES */
    const headerClasses = `
        headers-wrapper
        ${className}
    `;
    
    return (
        <section id={id} className={headerClasses}>
            {
                [ ...Array( 6 ) ].map( ( _, index ) => {
                    /* CONTENT */
                    const headerType = index + 1;
                    const headerText = `${headerType}. ${text}`;
                    return (
                        <Text className={`header-${headerType}`} content={{text: headerText}} 
                            Component={`h${headerType}`} />
                    );
                } )
            }
        </section>
    );
}

export default Header;