<script setup>
import LogoComponent from '../logo/LogoComponent.vue'

</script>

<template>
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-brand">
                <LogoComponent />
                <p>Tu biblioteca personal de anime. Descubre, guarda y valora tus series favoritas.</p>
            </div>

            <div class="footer-social-links">
                <h2>Síguenos</h2>

                <ul>
                    <li>
                        <a href="#" aria-label="Twitter">
                        <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                        </svg>
                        </a>
                    </li>

                    <li>
                        <a href="#" aria-label="Instagram">
                            <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                                </svg>                        
                        </a>
                    </li>

                    <li>
                        <a href="#" aria-label="YouTube">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                                <path d="m10 15 5-3-5-3z"></path>
                            </svg>
                        </a>                   
                    </li>
                </ul>
            </div>
        </div>

        <div class="footer-bottom">
            <p>© 2026 OtakuHub. Todos Los Derechos Reservados.</p>
        </div>
    </footer>
</template>

<style scoped lang="scss">
    .footer {
        padding: 48px 24px;
        background: #ffffff;
        border-top: 1px solid #dde2ea;
    }

    .footer-content {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin-bottom: 24px;
        gap: 32px;
        border-bottom: 1px solid #dde2ea;
    }

    .footer-brand {
        max-width: 384px;
    

        p {
            margin-top: 12px;
            color: #4b5563;
            font-size: 14px;
            line-height: 1.4;
        }
    }

    .footer-social-links {
        text-align: right;

        h2 {
            font-size: 14px;
            font-weight: 600;
            line-height: 1.4;
            font-family: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
            letter-spacing: -.02em;
        }

        ul {
            display: flex;
            justify-content: flex-end;
            gap: 8px;
            margin-top: 12px;
            list-style: none;
            padding: 0;
        }

        a {
            width: 34px;
            height: 34px;
            border: 1px solid #dde2ea;
            border-radius: 12px;
            display: grid;
            align-items: center;
            justify-content: center;
            color: #5f6b7a;
        }

        svg {
            width: 16px;
            height: 16px;
            stroke-width: 2;
            stroke-linecap: round;
            stroke-linejoin: round;
        }
    }

    .footer-bottom {
        padding-top: 24px;

        p {
            color: #4b5563;
            font-size: 12px;
            margin: 0;
        }
    }

    @media (max-width: 768px) {
        .footer {
            padding: 40px 24px 24px;
        }

        .footer-content {
            flex-direction: column;
            gap: 24px;
            margin-bottom: 24px;
            padding-bottom: 32px;
        }

        .footer-brand {
            max-width: 100%;
        }

        .footer-social-links {
            text-align: left;

            h2 {
            margin-bottom: 12px;
            }

            ul {
            justify-content: flex-start;
            }
        }

        .footer-bottom {
            padding-top: 0;

            p {
            font-size: 12px;
            }
        }
    }

</style>