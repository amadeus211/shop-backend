import Image from 'next/image';
import arrowIcon from '../app/images/arrow.png';
import { useRouter } from 'next/router';

const BackToHomeIcon = () => {
    const router = useRouter();
  
    const handleNavigateHome = () => {
      router.push('/');
    };
  
    return (
      <div
        onClick={handleNavigateHome}
        className="absolute top-4 left-4 cursor-pointer z-50"
      >
        <Image src={arrowIcon} alt="Back to Home" width={40} height={40} />
      </div>
    );
  };

  export default BackToHomeIcon;

  
