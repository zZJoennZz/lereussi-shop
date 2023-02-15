import Meta from "@/components/Meta"
import styles from "@/styles/PrivacyPolicy.module.css"

export default function PrivacyPolicy(): JSX.Element {
    return (
        <>
            <Meta title="Privacy Policy | Le REUSSI" />
            <div style={{minHeight: '60vh'}} className="flex items-center">
                <div className={styles.ppContainer}>
                    <div className={styles.ppContainerInner}>
                        <h1 className="text-3xl font-bold text-gray-700 mb-1">Privacy Policy for Le REUSSI</h1>
                        <div className="text-gray-500 italic mb-3">Last updated on 2/2/2023</div>
                        <p className="text-gray-500 mb-3">At Le REUSSI, accessible from https://www.lereussi.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Le REUSSI and how we use it.</p>
                        <p className="text-gray-500 mb-3">If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.</p>
                        <h2 className="text-2xl font-bold text-gray-600 mb-2">Log Files</h2>
                        <p className="text-gray-500 mb-3">Le REUSSI follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services{"'"} analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users{"'"} movement on the website, and gathering demographic information.</p>
                        <h2 className="text-2xl font-bold text-gray-600 mb-2">Cookies and Web Beacons</h2>
                        <p className="text-gray-500 mb-3">Like any other website, Le REUSSI uses {"'"}cookies{"'"}. These cookies are used to store information including visitors{"'"} preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users{"'"} experience by customizing our web page content based on visitors{"'"} browser type and/or other information.</p>
                        <p className="text-gray-500 mb-3">For more general information on cookies, please read <a href="https://www.privacypolicyonline.com/what-are-cookies/">the {'"'}Cookies{'"'} article from the Privacy Policy Generator</a>.</p>
                        <h2 className="text-2xl font-bold text-gray-600 mb-2">Privacy Policies</h2>
                        <p className="text-gray-500 mb-3">You may consult this list to find the Privacy Policy for each of the advertising partners of Le REUSSI.</p>
                        <p className="text-gray-500 mb-3">Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Le REUSSI, which are sent directly to users{"'"} browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.</p>
                        <p className="text-gray-500 mb-3">Note that Le REUSSI has no access to or control over these cookies that are used by third-party advertisers.</p>
                        <h2 className="text-2xl font-bold text-gray-600 mb-2">Third Party Privacy Policies</h2>
                        <p className="text-gray-500 mb-3">Le REUSSI{"'"}s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options. </p>
                        <p className="text-gray-500 mb-3">You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers{"'"} respective websites. What Are Cookies?</p>
                        <h2 className="text-2xl font-bold text-gray-600 mb-2">Children{"'"}s Information</h2>
                        <p className="text-gray-500 mb-3">Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.</p>
                        <p className="text-gray-500 mb-3">Le REUSSI does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</p>
                        <h2 className="text-2xl font-bold text-gray-600 mb-2">Online Privacy Policy Only</h2>
                        <p className="text-gray-500 mb-3">This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Le REUSSI. This policy is not applicable to any information collected offline or via channels other than this website.</p>
                        <h2 className="text-2xl font-bold text-gray-600 mb-2">Consent</h2>
                        <p className="text-gray-500 mb-3">By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.</p>
                    </div>
                </div>
            </div>
        </>
    )
}