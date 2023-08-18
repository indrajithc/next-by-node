import { FC } from "react";
import { IconProps } from "@lib/types";

const Icon: FC<IconProps> = (props) => {
  return (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_683_107294)">
        <path d="M20.5269 4.2169L14.4999 0.736897C13.7393 0.299519 12.8773 0.0693359 11.9999 0.0693359C11.1225 0.0693359 10.2605 0.299519 9.4999 0.736897L3.4729 4.2169C2.71378 4.65681 2.08337 5.28822 1.64467 6.04805C1.20597 6.80788 0.974336 7.66952 0.9729 8.5469V15.5069C0.974363 16.3844 1.206 17.2462 1.64469 18.0062C2.08338 18.7661 2.71376 19.3977 3.4729 19.8379L9.4999 23.3169C10.2604 23.7546 11.1225 23.9849 11.9999 23.9849C12.8773 23.9849 13.7394 23.7546 14.4999 23.3169L20.5269 19.8379C21.286 19.3977 21.9164 18.7661 22.3551 18.0062C22.7938 17.2462 23.0254 16.3844 23.0269 15.5069V8.5469C23.0255 7.66952 22.7938 6.80788 22.3551 6.04805C21.9164 5.28822 21.286 4.65681 20.5269 4.2169ZM10.4999 2.4699C10.956 2.20659 11.4733 2.06797 11.9999 2.06797C12.5265 2.06797 13.0438 2.20659 13.4999 2.4699L19.5269 5.9489C19.6797 6.0455 19.8233 6.15596 19.9559 6.2789L13.7629 9.8539C13.2267 10.163 12.6188 10.3257 11.9999 10.3257C11.381 10.3257 10.7731 10.163 10.2369 9.8539L4.0439 6.2789C4.17647 6.15596 4.32007 6.0455 4.4729 5.9489L10.4999 2.4699ZM4.4729 18.1049C4.01711 17.8408 3.63865 17.4617 3.37541 17.0054C3.11217 16.5491 2.97337 16.0317 2.9729 15.5049V8.5469C2.97985 8.36674 3.00361 8.18763 3.0439 8.0119L9.2369 11.5869C9.78384 11.898 10.3802 12.1128 10.9999 12.2219V21.7909C10.8272 21.738 10.6598 21.669 10.4999 21.5849L4.4729 18.1049ZM21.0269 15.5049C21.0264 16.0317 20.8876 16.5491 20.6244 17.0054C20.3611 17.4617 19.9827 17.8408 19.5269 18.1049L13.4999 21.5849C13.34 21.669 13.1726 21.738 12.9999 21.7909V12.2219C13.6196 12.1128 14.216 11.898 14.7629 11.5869L20.9559 8.0119C20.9962 8.18763 21.02 8.36674 21.0269 8.5469V15.5049Z" />
      </g>
      <defs>
        <clipPath id="clip0_683_107294">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Icon;