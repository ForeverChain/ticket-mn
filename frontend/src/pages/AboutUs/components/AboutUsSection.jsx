export const AboutUsSection = () => {
    return (
        <section className="section-about-us ">
            <div className="container">
                <div className="about-us-heading">
                    Unveiling Our Story Behind
                    <div className="aboutus-logo-container">
                        <svg xmlns="http://www.w3.org/2000/svg" className="aboutus-logo-icon" viewBox="0 0 512 512">
                            <path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32" />
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M360 94.59V296M443.13 212.87L296 360M417.41 360H216M299.13 443.13l-144-144M152 416V216M68.87 299.13l144-144M94.59 152H288M212.87 68.87L360 216" />
                        </svg>
                        <h1 className="aboutus-logo-text">Uzwer</h1>
                    </div>
                </div>
            </div>
        </section>
    );
};
