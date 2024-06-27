import { component$, useVisibleTask$, useSignal } from "@builder.io/qwik";
import QRCode from "qrcode";

interface QRCodeComponentProps {
  qrData: string;
}

export const QRCodeComponent = component$((props: QRCodeComponentProps) => {
  const qrCodeUrl = useSignal("");

  console.log("Props Data", props.qrData);
  useVisibleTask$(() => {
    QRCode.toDataURL(props.qrData)
      .then((url) => {
        qrCodeUrl.value = url;
      })
      .catch((err) => {
        console.error(err);
      });
  });

  return (
    <div>
      {qrCodeUrl.value ? (
        <img src={qrCodeUrl.value} alt="QR Code" height={200} width={200} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
});
