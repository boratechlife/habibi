import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, z, zod$ } from "@builder.io/qwik-city";
import BaseLayout from "~/components/common/BaseLayout";
import Input from "~/components/common/form/Input";
import Select from "~/components/common/form/Select";

export const useRegister = routeAction$(
  async (data) => {
    console.log(data);

    return {
      success: true,
    };
  },
  zod$({
    username: z.string().min(5),
    password: z.string().min(8),
    email: z.string().email(),
    telephone: z.string().max(13),
    bank: z.string(),
    bankName: z.string(),
    bankAccount: z.string().max(18),
    referralCode: z.string(),
  }),
);

export default component$(() => {
  const action = useRegister();
  return (
    <BaseLayout autoLogoSize>
      <div class="mx-auto bg-[linear-gradient(#217cb1,#003f64)] pt-2">
        <Form action={action} class="space-y-3">
          <div>
            <div class="mb-[15px]  bg-sky-300  py-2.5 text-center text-lg text-white ">
              Informasi Pribadi
            </div>

            <div class="space-y-1 px-10">
              <Input
                label="Nama Pengguna"
                name="username"
                placeholder="Nama Pengguna Anda"
                required
              />
              <Input
                label="Kata Sandi"
                name="password"
                type="password"
                placeholder="Kata Sandi Anda"
                required
              />
              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="email@example.com"
              />

              <div>
                <Input
                  label="No. Telepon"
                  name="telephone"
                  type="text"
                  placeholder="Nomor Telefon Anda"
                />

                <div class="text-sm text-gray-500">0/ 13</div>
              </div>
            </div>
          </div>

          <div>
            <div class="mb-[15px] bg-sky-300 px-0 py-2.5 text-center text-lg text-white ">
              Informasi Pembayaran
            </div>
            <div class="space-y-1 px-10">
              <Select
                label="Bank"
                name="bank"
                placeholderOption="-- Pilih Bank --"
                options={[
                  { label: "bca", value: "BCA" },
                  { label: "blu", value: "BLU" },
                  { label: "bni", value: "BNI" },
                  { label: "bri", value: "BRI" },
                  { label: "bsi", value: "BSI" },
                  { label: "cimb niaga", value: "CIMB" },
                  { label: "dana", value: "DANA" },
                  { label: "danamon", value: "DANAMON" },
                  { label: "jago", value: "JAGO" },
                  { label: "mandiri", value: "MANDIRI" },
                  { label: "pertama", value: "PERMATA" },
                  { label: "ovo", value: "OVO" },
                ]}
                required
              />

              <Input
                label="Nama Lengkap"
                placeholder="Nama lengkap anda sesuai dengan buku tabungan"
                name="bankName"
                autocomplete="off"
                required
              />

              <div>
                <Input
                  label="No. Rekening"
                  placeholder="Nomor rekening anda"
                  name="bankAccount"
                  autocomplete="off"
                  required
                />
                <div class="text-sm text-gray-500">0/ 18</div>
              </div>

              <Input
                wrapperClasses="pt-2"
                label="Referral"
                placeholder="Kode Referensi"
                name="referralCode"
                autocomplete="off"
                required
              />
            </div>
          </div>

          <div class="px-10">
            <button class="w-full rounded-3xl  border-0 border-solid border-[#f0a50e] bg-[#ff9806] bg-[linear-gradient(180deg,#ddf3ff_0,#1cadff_50%,#0073b3)] p-3 uppercase text-white shadow-[inset_0_0_0_0_#000,_inset_-1px_-3px_0_0_#4dbeff,_inset_0_2px_4px_2px_#5ac4ff,_0_0_0_0_rgba(0,_0,_0,_.2)] hover:bg-[#ffb31b]">
              Daftar
            </button>

            <div class="mb-5 mt-5 text-center text-xs text-gray-500">
              <p>
                Dengan meng-klik tombol DAFTAR, saya menyatakan bahwa saya
                berumur diatas 18 tahun dan telah membaca dan menyetujui syarat
                &amp; ketentuan PAUS4D.
              </p>
            </div>
            <div class="pb-5 text-center text-xs">
              <a class="uppercase text-white hover:bg-[#ffb31b]" href="#">
                syarat &amp; ketentuan
              </a>
            </div>
          </div>
        </Form>
      </div>
    </BaseLayout>
  );
});
