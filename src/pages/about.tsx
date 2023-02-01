import Meta from '@/components/Meta'
import styles from '@/styles/About.module.css'
import aboutBg from '@/img/about-bg.png'
export default function About() {
    return (
        <>
            <Meta title='About Us | Le REUSSI' />
            <div style={{minHeight: '60vh'}}>
                <div style={{ backgroundImage: `url('${aboutBg.src}')`}} className={styles.aboutSection + ` mt-2 md:mt-4 bg-contain bg-right-bottom bg-no-repeat`}>
                    <div className={styles.aboutInnerSection}>
                        <h1 className="text-2xl md:text-5xl font-bold mb-3">
                            <span className="text-slate-600">About</span> <span className="text-pizza-700">Le REUSSI</span>
                        </h1>
                        <div className="block md:grid md:grid-cols-2">
                            <p className="text-slate-600">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu lacus at ligula lacinia tempus. Sed nulla massa, molestie sed quam sed, lacinia eleifend dolor. Integer quis neque non tellus consectetur elementum. Suspendisse tempus et lectus et fringilla. Quisque hendrerit eleifend venenatis. Suspendisse porttitor odio tortor, sed interdum justo placerat vitae. Integer vel dui felis. Aliquam fermentum lorem ut fermentum luctus. Etiam turpis ligula, ullamcorper ut ultricies eu, finibus at lorem. Cras ullamcorper maximus ultricies. Vestibulum libero ex, pulvinar ut laoreet nec, tempor sit amet mi. Fusce elementum aliquam orci. Aenean lobortis ligula quis sem mollis, vitae ultrices orci ultricies.
                            </p>
                            <div className="h-52"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
