import Image from 'next/image'
import Meta from '@/components/Meta'
import styles from '@/styles/About.module.css'
import aboutBg from '@/img/about-bg.png'
export default function About() {
    return (
        <>
            <Meta title='About Us | Le REUSSI' />
            <div style={{minHeight: '60vh'}} className="flex items-center">
                <div className={styles.aboutSection}>
                    <div className={styles.aboutInnerSection}>
                        <div className="pl-0 lg:pl-6 w-full">
                            <h1 className="text-2xl md:text-5xl font-bold mb-3">
                                <span className="text-slate-600">About</span> <span className="text-pizza-700">Le REUSSI</span>
                            </h1>
                            <p className="text-slate-600">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu lacus at ligula lacinia tempus. Sed nulla massa, molestie sed quam sed, lacinia eleifend dolor. Integer quis neque non tellus consectetur elementum. Suspendisse tempus et lectus et fringilla. Quisque hendrerit eleifend venenatis. Suspendisse porttitor odio tortor, sed interdum justo placerat vitae. Integer vel dui felis. Aliquam fermentum lorem ut fermentum luctus. Etiam turpis ligula, ullamcorper ut ultricies eu, finibus at lorem. Cras ullamcorper maximus ultricies. Vestibulum libero ex, pulvinar ut laoreet nec, tempor sit amet mi. Fusce elementum aliquam orci. Aenean lobortis ligula quis sem mollis, vitae ultrices orci ultricies.
                            </p>
                        </div>
                        <div className="flex items-center justify-end">
                            <Image src={aboutBg} className="w-4/5" alt="About us" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
