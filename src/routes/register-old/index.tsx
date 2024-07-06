import { $, component$, useSignal, useStore } from "@builder.io/qwik";
import { useNavigate, z } from "@builder.io/qwik-city";
import BaseLayout from "~/components/common/BaseLayout";
import Input from "~/components/common/form/Input";
import Select from "~/components/common/form/Select";
import {
  fetchCheckAccountNo,
  fetchCheckPhone,
  fetchRegister,
} from "~/utils/Main";

export const useRegisterSchema = z.object({
  username: z.string().min(5),
  password: z.string().min(8),
  email: z.string().email(),
  telephone: z
    .string()
    .min(10, "Nomor Kontak Harus diantara 10 dan 13 digit")
    .max(13, "Nomor Kontak Harus diantara 10 dan 13 digit")
    .regex(/^[0-9]{10,13}$/, "Nomor Kontak Harus diantara 10 dan 13 digit")
    .refine(
      async (value) => {
        console.log("value", value);
        if (value.length < 0) {
          return false;
        }

        const phoneNo = `+62${value.substring(1)}`;
        const result = await fetchCheckPhone(phoneNo);

        if (!result.success) {
          console.error("Error", result.error);
          return;
        }

        const responseBody = result.data;
        return !responseBody.exists;
      },
      {
        message: "Nomor telpon tidak bisa di gunakan! sudah terdaftar",
      },
    ),
  bank: z.string().min(1, "Bank is required"),
  bankName: z.string().min(1, "Bank name is required"),
  bankAccount: z
    .string()
    .min(10, {
      message: "Nomor rekening harus diisi dan harus diantara 10 dan 18 digit",
    })
    .max(18, {
      message: "Nomor rekening harus diisi dan harus diantara 10 dan 18 digit",
    })
    .regex(/^[0-9]{10,18}$/, {
      message: "Nomor rekening harus diisi dan harus diantara 10 dan 18 digit",
    })
    .refine(
      async (value) => {
        if (value.length >= 10 && value.length <= 18) {
          const result = await fetchCheckAccountNo(value);

          if (!result.success) {
            console.error("Error", result.error);
            return false;
          }

          const responseBody = result.data;
          console.log("Account number check response", responseBody);
          return !responseBody.exist;
        }
        return true;
      },
      {
        message: "Nomor rekening tidak bisa di gunakan! sudah terdaftar",
      },
    ),
  referralCode: z.string(),
});

export interface UserRegister {
  username: string;
  password: string;
  email: string;
  telephone: string;
  bank: string;
  bankName: string;
  bankAccount: string;
  referralCode: string;
}

interface ValidationErrors {
  formErrors: string[];
  fieldErrors: {
    [field: string]: string[];
  };
}

export default component$(() => {
  // const action = useRegister();
  const navigate = useNavigate();
  const formData = useStore<any>({
    username: "",
    password: "",
    email: "",
    telephone: "",
    bank: "",
    bankName: "",
    bankAccount: "",
    referralCode: "",
  });
  const error = useSignal<any>();
  const fieldErrors = useStore<ValidationErrors>({
    formErrors: [],
    fieldErrors: {},
  });
  const handleInputChange = $((e: Event) => {
    const target = e.target as HTMLInputElement;
    const name: string = target.name;
    const value: string = target.value;
    formData[name] = value;
    console.log("name", name, target.name, formData[name]);
  });

  const handleSubmit = $(async (e: Event) => {
    e.preventDefault();
    console.log("form Data", formData);

    const result = await useRegisterSchema.safeParseAsync(formData);

    if (!result.success) {
      fieldErrors.fieldErrors = result.error.formErrors.fieldErrors;
      console.log("ERRORS", fieldErrors.fieldErrors);
      return;
    }

    const registerResult = await fetchRegister(formData);

    if (!registerResult.success) {
      console.log("Error", registerResult.error);
      error.value = registerResult.error;
      alert("error");
      return;
    }

    console.log("Registration successful", registerResult.data);
    navigate("/login");
  });
  return (
    <BaseLayout autoLogoSize>
      <div class="mx-auto bg-[linear-gradient(#217cb1,#003f64)] pt-2">
        <div class="space-y-3">
          <div>
            <div class="mb-[15px]  bg-sky-300  py-2.5 text-center text-lg text-white ">
              Informasi Pribadi
            </div>

            <div class="space-y-1 px-10">
              <Input
                label="Nama Pengguna"
                name="username"
                placeholder="Nama Pengguna Anda"
                errors={
                  fieldErrors.fieldErrors && fieldErrors.fieldErrors.username
                }
                onInput={$((e) => handleInputChange(e as any))}
                required
              />
              <Input
                label="Kata Sandi"
                name="password"
                type="password"
                errors={
                  fieldErrors.fieldErrors && fieldErrors.fieldErrors.password
                }
                onInput={$((e) => handleInputChange(e as Event))}
                placeholder="Kata Sandi Anda"
                required
              />

              <div class="">
                <Input
                  label="Email"
                  name="email"
                  errors={
                    fieldErrors.fieldErrors && fieldErrors.fieldErrors.email
                  }
                  onInput={$((e) => handleInputChange(e as Event))}
                  type="email"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <Input
                  label="No. Telepon"
                  name="telephone"
                  errors={
                    fieldErrors.fieldErrors && fieldErrors.fieldErrors.telephone
                  }
                  onInput={$((e) => handleInputChange(e as Event))}
                  type="text"
                  placeholder="Nomor Telefon Anda"
                />

                <div class="text-sm text-gray-500">
                  {formData.telephone.length}/ 13
                </div>
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
                errors={fieldErrors.fieldErrors && fieldErrors.fieldErrors.bank}
                placeholderOption="-- Pilih Bank --"
                onInput={$((e) => handleInputChange(e as Event))}
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
                errors={
                  fieldErrors.fieldErrors && fieldErrors.fieldErrors.bankName
                }
                onInput={$((e) => handleInputChange(e as Event))}
                autocomplete="off"
                required
              />

              <div>
                <Input
                  label="No. Rekening"
                  placeholder="Nomor rekening anda"
                  name="bankAccount"
                  errors={
                    fieldErrors.fieldErrors &&
                    fieldErrors.fieldErrors.bankAccount
                  }
                  onInput={$((e) => handleInputChange(e as Event))}
                  autocomplete="off"
                  required
                />
                <div class="text-sm text-gray-500">
                  {" "}
                  {formData.bankAccount.length}/ 18
                </div>
              </div>

              <Input
                wrapperClasses="pt-2"
                label="Referral"
                placeholder="Kode Referensi"
                name="referralCode"
                errors={
                  fieldErrors.fieldErrors &&
                  fieldErrors.fieldErrors.referralCode
                }
                onInput={$((e) => handleInputChange(e as Event))}
                autocomplete="off"
              />
            </div>
          </div>

          <div class="px-10">
            <button
              onClick$={handleSubmit}
              class="w-full rounded-3xl  border-0 border-solid border-[#f0a50e] bg-[#ff9806] bg-[linear-gradient(180deg,#ddf3ff_0,#1cadff_50%,#0073b3)] p-3 uppercase text-white shadow-[inset_0_0_0_0_#000,_inset_-1px_-3px_0_0_#4dbeff,_inset_0_2px_4px_2px_#5ac4ff,_0_0_0_0_rgba(0,_0,_0,_.2)] hover:bg-[#ffb31b]"
            >
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
        </div>
      </div>
    </BaseLayout>
  );
});
