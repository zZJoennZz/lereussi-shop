import Meta from '@/components/Meta'

import styles from '@/styles/TermsAndConditions.module.css'

export default function TermsAndConditions(): JSX.Element {
    return(
        <>
            <Meta title="Terms and Conditions of Uses | Le REUSSI" />
            <div style={{minHeight: '60vh'}} className="flex items-center">
                <div className={styles.termsContainer}>
                    <div className={styles.termsContainerInner}>
                        <h1 className="text-3xl font-bold text-gray-700 mb-1">Website Terms and Conditions of Use</h1>
                        <div className="text-gray-500 italic mb-3">Last updated on 2/2/2023</div>
                        <h2 className="text-2xl font-bold text-gray-600 mb-2">1. Terms</h2>
                        <p className="text-gray-500 mb-3">By accessing this Website, accessible from https://www.lereussi.com, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site. The materials contained in this Website are protected by copyright and trade mark law.</p>
                        <h2 className="text-2xl font-bold text-gray-600 mb-2">2. Use License</h2>
                        <p className="text-gray-500 mb-2">Permission is granted to temporarily download one copy of the materials on Le REUSSI{"'"}s Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                        <ul className="list-inside list-disc mb-2 text-gray-500">
                            <li>modify or copy the materials;</li>
                            <li>use the materials for any commercial purpose or for any public display;</li>
                            <li>attempt to reverse engineer any software contained on Le REUSSI{"'"}s Website;</li>
                            <li>remove any copyright or other proprietary notations from the materials; or</li>
                            <li>transferring the materials to another person or {'"'}mirror{'"'} the materials on any other server.</li>
                        </ul>
                        <p className="text-gray-500 mb-3">This will let Le REUSSI to terminate upon violations of any of these restrictions. Upon termination, your viewing right will also be terminated and you should destroy any downloaded materials in your possession whether it is printed or electronic format. These Terms of Service has been created with the help of the <a href="https://www.termsofservicegenerator.net">Terms Of Service Generator</a>.</p>
                        <h2  className="text-2xl font-bold text-gray-600 mb-2">3. Disclaimer</h2>
                        <p className="text-gray-500 mb-3">All the materials on Le REUSSI’s Website are provided {'"'}as is{'"'}. Le REUSSI makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, Le REUSSI does not make any representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this Website.</p>
                        <h2  className="text-2xl font-bold text-gray-600 mb-2">4. Limitations</h2>
                        <p className="text-gray-500 mb-3">Le REUSSI or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on Le REUSSI’s Website, even if Le REUSSI or an authorize representative of this Website has been notified, orally or written, of the possibility of such damage. Some jurisdiction does not allow limitations on implied warranties or limitations of liability for incidental damages, these limitations may not apply to you.</p>
                        <h2  className="text-2xl font-bold text-gray-600 mb-2">5. Revisions and Errata</h2>
                        <p className="text-gray-500 mb-3">The materials appearing on Le REUSSI’s Website may include technical, typographical, or photographic errors. Le REUSSI will not promise that any of the materials in this Website are accurate, complete, or current. Le REUSSI may change the materials contained on its Website at any time without notice. Le REUSSI does not make any commitment to update the materials.</p>
                        <h2  className="text-2xl font-bold text-gray-600 mb-2">6. Links</h2>
                        <p className="text-gray-500 mb-3">Le REUSSI has not reviewed all of the sites linked to its Website and is not responsible for the contents of any such linked site. The presence of any link does not imply endorsement by Le REUSSI of the site. The use of any linked website is at the user’s own risk.</p>
                        <h2  className="text-2xl font-bold text-gray-600 mb-2">7. Site Terms of Use Modifications</h2>
                        <p className="text-gray-500 mb-3">Le REUSSI may revise these Terms of Use for its Website at any time without prior notice. By using this Website, you are agreeing to be bound by the current version of these Terms and Conditions of Use.</p>
                        <h2  className="text-2xl font-bold text-gray-600 mb-2">8. Your Privacy</h2>
                        <p className="text-gray-500 mb-3">Please read our Privacy Policy.</p>
                        <h2  className="text-2xl font-bold text-gray-600 mb-2">9. Governing Law</h2>
                        <p className="text-gray-500 mb-3">Any claim related to Le REUSSI{"'"}s Website shall be governed by the laws of the Philippines without regards to its conflict of law provisions.</p>
                    </div>
                </div>
            </div>
        </>
    )
}