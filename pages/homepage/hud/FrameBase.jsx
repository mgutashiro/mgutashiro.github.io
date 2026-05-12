import * as React from "react"

export default function FrameBase({ className = "", ...props })  {
  const gradientId = React.useId().replace(/:/g, "-")
  return (
    <svg
      viewBox="0 0 750 500"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden="true"
      focusable="false"
      className={`homepageFrameBaseSVG ${className}`}
      {...props}
    >
      <defs>
        <linearGradient
          id={`${gradientId}-centerFill`}
          x1="0"
          y1="0"
          x2="320"
          y2="528"
          gradientUnits="userSpaceOnUse"
        >
          <stop className="frameCenterStop frameCenterStop--top" offset="0%" />
          <stop className="frameCenterStop frameCenterStop--mid" offset="48%" />
          <stop className="frameCenterStop frameCenterStop--bottom" offset="100%" />
        </linearGradient>
      </defs>
      <g className="frameArtWork" transform="translate(-120 -30) scale(1.35 0.95)">
          <path className="frameThin" d="M367.757 27.0483H164.732V567.436H367.757M367.757 27.0483H569.025V567.436H367.757M367.757 27.0483V567.436M148.033 577.4H585.724V17.5593H148.033V577.4Z" stroke="black"/>

          <g className="frameMedium" >
            <path 
              d="
                M135.728 557.473L70.69 521.416V72.5947L135.728 37.4861H597.149L663.945 72.5947V521.416L597.149 557.473H135.728Z
              " 
            />
            <path d="M694.707 403.754H38.1708V191.205H694.707V403.754Z" />
          </g>

            <path 
              className="frameThick" 
              d="
                M25.8663 45.0771V82.0835H46.9598V184.088H24.9874V410.871H48.7176V512.876H24.9874V548.933
                M708.769 44.6027V82.0835H686.797V184.088H708.769V410.871H686.797V512.876H708.769V549.408
              " 
            />

            <path 
              className="frameThin" 
              d="
                M12.6828 52.1936V88.7256H34.6552V176.972H12.6828V417.039H34.6552V506.234H12.6828V542.291
                M721.074 53.6168V89.1998H698.222V176.971H721.074V417.987H698.222V506.233H721.074V541.816
              " 
            />

            <path 
              className="frameThick" 
              d="
                M0.37825 47.9236L6.53053 55.0402L28.6001 43.1452L51.3543 55.0402L102.33 28.4715L79.3788 16.2057L102.33 3.80058L91.7835 0.479492
                M88.2679 594.479L101.451 591.158L79.4161 579.245L101.451 566.962L52.2332 539.444L29.5108 551.834L6.53053 539.444L0.37825 545.138
                M644.61 594.479L631.426 591.158L653.462 579.245L631.426 566.962L680.644 539.444L703.367 551.834L726.347 539.444L732.499 545.138
                M733.378 47.9236L727.226 55.0402L705.156 43.1452L682.402 55.0402L631.426 28.4715L654.378 16.2057L631.426 3.80058L641.973 0.479492
              " 
            />

            <path 
              className="frameThin" 
              d="
                M733.378 33.2158L722.509 43.9457L703.2 33.0605L681.227 44.9215L650.762 28.9458L673.148 17.3263L653.812 6.41417L673.148 0.700459
                M3.89384 32.9948L14.7635 43.7247L34.0726 32.8395L56.045 44.7005L86.5102 28.7249L64.1242 17.1054L83.4599 6.19321L64.1242 0.479492
                M0.37825 561.588L11.248 550.858L30.557 561.743L52.5294 549.882L82.9946 565.858L60.6086 577.477L79.9443 588.39L60.6086 594.103
                M733.378 561.588L722.509 550.858L703.2 561.743L681.227 549.882L650.762 565.858L673.148 577.477L653.812 588.39L673.148 594.103
              "
            />

            <path 
              className="frameThin" 
              d="
                M0.37825 590.21L63.6588 560.32L7.40943 594.48
                M733.378 590.21L670.098 560.32L726.347 594.48
                M733.378 4.74958L670.098 34.6394L726.347 0.479614
                M0.37825 4.74958L63.6588 34.6394L7.40943 0.479614
              " 
            />

            <path 
              className="frameThin" 
              d="
                M115.514 8.54517H620.879
                M111.119 585.94H611.212
                M60.1432 94.8934V172.702
                M60.1432 422.257V500.54
                M673.613 422.257V500.54
                M673.613 95.3678V173.651
              " 
            />
          <path 
            className="frameCenterMain" 
            fill={`url(#${gradientId}-centerFill)`}
            d="M89.1633 547.984L85.6312 47.4492H648.125V547.984H89.1633Z" 
          />
      </g>
    </svg>
  );
}

