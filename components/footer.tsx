import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Image from 'next/image';
const Footer = () => {
  const { t }: { t: any } = useTranslation(['common', 'button']);
  return (
    <footer className='px-4 divide-y bg-primary text-gray-100'>
      <div className='container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0 border-b border-solid border-dark-tint'>
        <div className='lg:w-1/3'>
          <Link href='/' className='flex justify-center'>
            <div className='hidden relative w-40 h-28 md:block'>
              <Image
                alt='sadana-logo'
                src='/images/Group 54568.svg'
                layout='fill'
                objectFit='contain'
              ></Image>
            </div>
          </Link>
        </div>
        <div className='grid text-sm text-center gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-3 md:text-start'>
          <div className='space-y-6'>
            <h3 className='tracking-wide text-white font-bold text-xl'>
              {t('common:more-info')}
            </h3>
            <ul className='space-y-1 text-xl'>
              <li>
                <Link passHref href='/about'>
                  {t('common:about-us')}
                </Link>
              </li>
              <li>
                <Link passHref href='/about'>
                  {t('common:privacy-policy')}
                </Link>
              </li>
              <li>
                <Link passHref href='/about'>
                  {t('common:terms-conditions')}
                </Link>
              </li>
            </ul>
          </div>
          <div className='space-y-6'>
            <h3 className=' text-white font-bold text-xl'>
              {t('common:contact-us')}
            </h3>
            <ul className='space-y-1'>
              <li className='flex justify-center md:justify-start items-center gap-2'>
                <i className='icon-appel-telephonique text-lg text-white'></i>
                <div className='text-lg'>+966 530 301 827</div>
              </li>
              <li className='flex justify-center md:justify-start items-center gap-2'>
                <i className='icon-appel-telephonique text-lg text-white'></i>
                <div className='text-lg'>+966 530 301 829</div>
              </li>
              <li className='flex justify-center md:justify-start items-center gap-2'>
                <i className='icon-appel-telephonique text-lg text-white'></i>
                <div className='text-lg'>+966 540 595 444</div>
              </li>
            </ul>
          </div>
          <div className='space-y-6'>
            <h3 className=' text-white font-bold text-xl'>
              {t('common:social-media')}
            </h3>
            <ul className='space-y-1'>
              <li>
                <a
                  rel='noopener noreferrer'
                  href='#'
                  className='flex justify-center md:justify-start items-center gap-2'
                >
                  <i className='icon-twitter text-lg text-white'></i>
                  <div className='text-lg'>Twitter</div>
                </a>
              </li>
              <li>
                <a
                  rel='noopener noreferrer'
                  href='#'
                  className='flex justify-center md:justify-start items-center gap-2'
                >
                  <i className='icon-instagram text-lg text-white'></i>
                  <div className='text-lg'>Instagram</div>
                </a>
              </li>
              <li>
                <a
                  rel='noopener noreferrer'
                  href='#'
                  className='flex justify-center md:justify-start items-center gap-2'
                >
                  <i className='icon-snapchat text-lg text-white'></i>
                  <div className='text-lg'>Snapchat</div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='py-2 text-xxs text-center text-primary-tint'>
        &copy; {new Date().getFullYear()} Sadana
      </div>
    </footer>
  );
};

export default Footer;
