import styles from './Footer.module.css'
function Footer() {
    return (
        <footer className={styles.footer}>
            <h4 className={styles.footerHeading}>Contact Information</h4>
            <div className={styles.detailsContainer}>
                <p><strong>Name:</strong> Harish Bathini</p>
                <p><strong>Email:</strong> bathiniharish7@gmail.com</p>
                <p><strong>Phone:</strong> +91 XXXXXXXXXX</p>
                <p>
                    <strong>LinkedIn:</strong>{" "}
                    <a
                        href="https://www.linkedin.com/in/harish-bathini"
                        target="_blank"
                        rel="noreferrer"
                    >
                        linkedin.com/in/harish-bathini
                    </a>
                </p>

                <p style={{ marginTop: "10px", fontSize: "14px" }}>
                    © 2026 All rights reserved.
                </p>

            </div>



        </footer>
    );
}

export default Footer;
