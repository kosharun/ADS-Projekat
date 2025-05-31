import { useEffect } from "react";

const VoiceflowWidget = () => {
  useEffect(() => {
    // Delay script injection to ensure page is hydrated
    const timeout = setTimeout(() => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://cdn.voiceflow.com/widget/bundle.js";
      script.async = true;

      script.onload = () => {
        console.log("✅ Voiceflow script loaded");

        if (window.voiceflow?.chat) {
          console.log("✅ voiceflow.chat found");
          window.voiceflow.chat.load({
            verify: { projectID: '67edafbe1ff0fa50bdb0eb95' },
            url: 'https://general-runtime.voiceflow.com',
            versionID: 'production',
            voice: {
              url: 'https://runtime-api.voiceflow.com',
            },
          });
        } else {
          console.error("❌ voiceflow.chat not available");
        }
      };

      document.body.appendChild(script);
    }, 100); // slight delay (100ms)

    return () => clearTimeout(timeout);
  }, []);

  return null;
};

export default VoiceflowWidget;
