import { GetServerSideProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../../components/layout';
import nextI18NextConfig from '../../i18n/next-i18next.config';
import HeadSeo from '../../components/HeadSeo';
import siteMetadata from '../../data/siteMetadata';

const PrivacyPolicy: NextPage = () => {
  const { t, i18n } = useTranslation([
    'common',
    'search',
    'button',
    'search',
    'input',
    'privacy',
  ]);

  return (
    <>
      <HeadSeo
        title={t('privacy:privacy-policy')}
        description={t('home:sadana')}
        canonicalUrl={siteMetadata.siteUrl}
        ogTwitterImage={siteMetadata.siteLogoSquare}
        ogType={'website'}
      />
      <Layout>
        <div className='bg-secondary-tint pt-16 lg:pt-20' dir='ltr'>
          <section className='bg-white py-24'>
            <div className='container mx-auto px-6 sm:px-12 sm:mx-auto flex flex-col gap-9 '>
              <h1 className='text-5xl font-bold text-black'>Privacy Policy</h1>
              <p className='text-base  text-dark'>
                This Privacy Policy applies only to our online activities and is
                valid for visitors to our website with regards to the
                information that they shared and/or collect in
                SadanaTourism.com. This policy is not applicable to any
                information collected offline or via channels other than this
                website. Our Privacy Policy was created with the help of the
                Privacy Policy Generator and the Free Privacy Policy Generator.
              </p>
              <div className='flex flex-col gap-3'>
                <h2 className='text-3xl font-medium text-black'>Consent</h2>
                <p className='text-base  text-dark'>
                  By using our website, you hereby consent to our Privacy Policy
                  and agree to its terms. For our Terms and Conditions, please
                  visit the Terms & Conditions Generator.
                </p>
              </div>
              <div className='flex flex-col gap-3'>
                <h2 className='text-3xl font-medium text-black'>Consent</h2>
                <p className='text-base  text-dark'>
                  By using our website, you hereby consent to our Privacy Policy
                  and agree to its terms. For our Terms and Conditions, please
                  visit the Terms & Conditions Generator.
                </p>
              </div>

              <div className='flex flex-col gap-3'>
                <h2 className='text-3xl font-medium text-black'>
                  Information we collect
                </h2>
                <p className='text-base  text-dark'>
                  The personal information that you are asked to provide, and
                  the reasons why you are asked to provide it, will be made
                  clear to you at the point we ask you to provide your personal
                  information.
                </p>
                <p className='text-base  text-dark'>
                  If you contact us directly, we may receive additional
                  information about you such as your name, email address, phone
                  number, the contents of the message and/or attachments you may
                  send us, and any other information you may choose to provide.
                </p>
                <p className='text-base  text-dark'>
                  When you register for an Account, we may ask for your contact
                  information, including items such as name, company name,
                  address, email address, and telephone number.
                </p>
              </div>
              <div className='flex flex-col gap-3'>
                <h2 className='text-3xl font-medium text-black'>
                  How we use your information
                </h2>
                <p className='text-base  text-dark'>
                  We use the information we collect in various ways, including
                  to:
                </p>
                <ul className='list-disc list-inside'>
                  <li className='list-disc text-base  text-dark list-item list-inside'>
                    Provide, operate, and maintain our webste
                  </li>
                  <li className='list-disc text-base  text-dark list-item list-inside'>
                    Improve, personalize, and expand our webste
                  </li>
                  <li className='list-disc text-base  text-dark list-item list-inside'>
                    Understand and analyze how you use our webste
                  </li>
                  <li className='list-disc text-base  text-dark list-item list-inside'>
                    Develop new products, services, features, and functionality
                  </li>
                  <li className='list-disc text-base  text-dark list-item list-inside'>
                    Communicate with you, either directly or through one of our
                    partners, including for customer service, to provide you
                    with updates and other information relating to the webste,
                    and for marketing and promotional purposes
                  </li>
                  <li className='list-disc text-base  text-dark list-item list-inside'>
                    Send you emails
                  </li>
                  <li className='list-disc text-base  text-dark list-item list-inside'>
                    Find and prevent fraud
                  </li>
                </ul>
              </div>
              <div className='flex flex-col gap-3'>
                <h2 className='text-3xl font-medium text-black'>Log Files</h2>
                <p className='text-base  text-dark'>
                  SadanaTourism.com follows a standard procedure of using log
                  files. These files log visitors when they visit websites. All
                  hosting companies do this and a part of hosting services
                  analytics. The information collected by log files include
                  internet protocol (IP) addresses, browser type, Internet
                  Service Provider (ISP), date and time stamp, referring/exit
                  pages, and possibly the number of clicks. These are not linked
                  to any information that is personally identifiable. The
                  purpose of the information is for analyzing trends,
                  administering the site, tracking users movement on the
                  website, and gathering demographic information.
                </p>
              </div>
              <div className='flex flex-col gap-3'>
                <h2 className='text-3xl font-medium text-black'>
                  Cookies and Web Beacons
                </h2>
                <p className='text-base  text-dark'>
                  Like any other website, SadanaTourism.com uses cookies. These
                  cookies are used to store information including visitors
                  preferences, and the pages on the website that the visitor
                  accessed or visited. The information is used to optimize the
                  users experience by customizing our web page content based on
                  visitors browser type and/or other information.
                </p>
                <p className='text-base  text-dark'>
                  For more general information on cookies, please read What Are
                  Cookies from Cookie Consent.
                </p>
              </div>
              <div className='flex flex-col gap-3'>
                <h2 className='text-3xl font-medium text-black'>
                  Advertising Partners Privacy Policies
                </h2>
                <p className='text-base  text-dark'>
                  You may consult this list to find the Privacy Policy for each
                  of the advertising partners of SadanaTourism.com.
                </p>
                <p className='text-base  text-dark'>
                  hird-party ad servers or ad networks uses technologies like
                  cookies, JavaScript, or Web Beacons that are used in their
                  respective advertisements and links that appear on
                  SadanaTourism.com, which are sent directly to users browser.
                  They automatically receive your IP address when this occurs.
                  These technologies are used to measure the effectiveness of
                  their advertising campaigns and/or to personalize the
                  advertising content that you see on websites that you visit.
                </p>
                <p className='text-base  text-dark'>
                  Note that SadanaTourism.com has no access to or control over
                  these cookies that are used by third-party advertisers.
                </p>
              </div>
              <div className='flex flex-col gap-3'>
                <h2 className='text-3xl font-medium text-black'>
                  Third Party Privacy Policies
                </h2>
                <p className='text-base  text-dark'>
                  {
                    "SadanaTourism.com's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options."
                  }
                </p>
                <p className='text-base  text-dark'>
                  {
                    " You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found  at the browsers' respective websites."
                  }
                </p>
              </div>
              <div className='flex flex-col gap-3'>
                <h2 className='text-3xl font-medium text-black'>
                  CCPA Privacy Rights (Do Not Sell My Personal Information)
                </h2>
                <p className='text-base  text-dark'>
                  Under the CCPA, among other rights, California consumers have
                  the right to:
                </p>
                <p className='text-base  text-dark'>
                  {
                    "Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers."
                  }
                </p>
                <p className='text-base  text-dark'>
                  Request that a business delete any personal data about the
                  consumer that a business has collected.
                </p>
                <p className='text-base  text-dark'>
                  {
                    "Request that a business that sells a consumer's personal data, not sell the consumer's personal data."
                  }
                </p>
                <p className='text-base  text-dark'>
                  If you make a request, we have one month to respond to you. If
                  you would like to exercise any of these rights, please contact
                  us.
                </p>
              </div>
              <div className='flex flex-col gap-3'>
                <h2 className='text-3xl font-medium text-black'>
                  GDPR Data Protection Rights
                </h2>
                <p className='text-base  text-dark'>
                  We would like to make sure you are fully aware of all of your
                  data protection rights. Every user is entitled to the
                  following:
                </p>
                <p className='text-base  text-dark'>
                  The right to access â€“ You have the right to request copies
                  of your personal data. We may charge you a small fee for this
                  service.
                </p>
                <p className='text-base  text-dark'>
                  The right to rectification â€“ You have the right to request
                  that we correct any information you believe is inaccurate. You
                  also have the right to request that we complete the
                  information you believe is incomplete.
                </p>
                <p className='text-base  text-dark'>
                  The right to erasure â€“ You have the right to request that we
                  erase your personal data, under certain conditions.
                </p>
                <p className='text-base  text-dark'>
                  The right to restrict processing â€“ You have the right to
                  request that we restrict the processing of your personal data,
                  under certain conditions.
                </p>
                <p className='text-base  text-dark'>
                  The right to object to processing â€“ You have the right to
                  object to our processing of your personal data, under certain
                  conditions.
                </p>
                <p className='text-base  text-dark'>
                  The right to data portability â€“ You have the right to
                  request that we transfer the data that we have collected to
                  another organization, or directly to you, under certain
                  conditions.
                </p>
                <p className='text-base  text-dark'>
                  If you make a request, we have one month to respond to you. If
                  you would like to exercise any of these rights, please contact
                  us.
                </p>
              </div>
              <div className='flex flex-col gap-3'>
                <h2 className='text-3xl font-medium text-black'>
                  {"Children's Information"}
                </h2>
                <p className='text-base  text-dark'>
                  Another part of our priority is adding protection for children
                  while using the internet. We encourage parents and guardians
                  to observe, participate in, and/or monitor and guide their
                  online activity.
                </p>
                <p className='text-base  text-dark'>
                  does not knowingly collect any Personal Identifiable
                  Information from children under the age of 13. If you think
                  that your child provided this kind of information on our
                  website, we strongly encourage you to contact us immediately
                  and we will do our best efforts to promptly remove such
                  information from our records.
                </p>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(
        context.locale as string,
        ['common', 'search', 'button', 'search', 'input', 'privacy'],
        nextI18NextConfig
      )),
    },
  };
};

export default PrivacyPolicy;
