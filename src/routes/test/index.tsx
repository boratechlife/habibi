import { $, component$, QRL } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import {
  formAction$,
  InitialValues,
  SubmitHandler,
  useForm,
  zodForm$,
} from "@modular-forms/qwik";
import { z } from "zod";
import {
  fetchCheckAccountNo,
  fetchCheckPhone,
  fetchRegister,
} from "~/utils/Main";

// Define your schema
export const useRegisterSchema = z.object({
  username: z.string().min(5),
  password: z.string().min(8),
  email: z.string().email(),
  telephone: z
    .string()
    .min(10, "Nomor Kontak Harus diantara 10 dan 13 digit")
    .max(13, "Nomor Kontak Harus diantara 10 dan 13 digit")
    .regex(/^[0-9]{10,13}$/, "Nomor Kontak Harus diantara 10 dan 13 digit"),
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
    }),
  referralCode: z.string(),
});

// Infer the type
export type LoginForm = z.infer<typeof useRegisterSchema>;

// Use the inferred type in routeLoader$
export const useFormLoader = routeLoader$<InitialValues<LoginForm>>(() => ({
  username: "",
  password: "",
  email: "",
  telephone: "",
  bank: "",
  bankName: "",
  bankAccount: "",
  referralCode: "",
}));

export const useFormAction = formAction$<LoginForm>(
  async (values, { redirect }) => {
    // Runs on server
    // Perform asynchronous validation
    const phoneNo = `+62${values.telephone.substring(1)}`;
    const phoneResult = await fetchCheckPhone(phoneNo);

    if (phoneResult.success && phoneResult.data.exist) {
      return {
        formErrors: [],
        fieldErrors: {
          telephone: ["Nomor telpon tidak bisa di gunakan! sudah terdaftar"],
        },
      };
    }

    const accountResult = await fetchCheckAccountNo(values.bankAccount);
    if (accountResult.success && accountResult.data.exist) {
      return {
        formErrors: [],
        fieldErrors: {
          bankAccount: [
            "Nomor rekening tidak bisa di gunakan! sudah terdaftar",
          ],
        },
      };
    }
    // Attempt to register the user
    const registerResult = await fetchRegister(values);

    if (!registerResult.success) {
      return {
        formErrors: [registerResult.error],
        fieldErrors: {},
      };
    }

    // If registration is successful, redirect to the login page
    redirect(301, "/login");
    return {
      formErrors: [],
      fieldErrors: {},
    };
  },
  zodForm$(useRegisterSchema),
);

const App = component$(() => {
  const [loginForm, { Form, Field, FieldArray }] = useForm<LoginForm>({
    loader: useFormLoader(),
    action: useFormAction(),
    validate: zodForm$(useRegisterSchema),
  });

  const handleSubmit: QRL<SubmitHandler<LoginForm>> = $((values, event) => {
    // Runs on client
    console.log("CLIENT", values);
  });

  return (
    <Form onSubmit$={handleSubmit} class="mx-auto mt-20 w-2/3 space-y-4">
      <Field name="username">
        {(field, props) => (
          <div>
            <input
              {...props}
              type="text"
              value={field.value}
              class="w-full text-black"
              placeholder="Username"
            />
            {field.error && <div class="text-red-500">{field.error}</div>}
          </div>
        )}
      </Field>
      <Field name="email">
        {(field, props) => (
          <div>
            <input
              {...props}
              type="email"
              class="w-full text-black"
              value={field.value}
              placeholder="Email"
            />
            {field.error && <div class="text-red-500">{field.error}</div>}
          </div>
        )}
      </Field>
      <Field name="password">
        {(field, props) => (
          <div>
            <input
              {...props}
              type="password"
              class="w-full text-black"
              value={field.value}
              placeholder="Password"
            />
            {field.error && <div class="text-red-500">{field.error}</div>}
          </div>
        )}
      </Field>
      <Field name="telephone">
        {(field, props) => (
          <div>
            <input
              {...props}
              type="text"
              class="w-full text-black"
              value={field.value}
              placeholder="Nomor Telefon Anda"
            />
            {field.error && <div class="text-red-500">{field.error}</div>}
          </div>
        )}
      </Field>
      <Field name="bank">
        {(field, props) => (
          <div>
            <select {...props} class="w-full text-black" value={field.value}>
              <option value="" disabled>
                -- Pilih Bank --
              </option>
              <option value="BCA">BCA</option>
              <option value="BLU">BLU</option>
              <option value="BNI">BNI</option>
              <option value="BRI">BRI</option>
              <option value="BSI">BSI</option>
              <option value="CIMB">CIMB</option>
              <option value="DANA">DANA</option>
              <option value="DANAMON">DANAMON</option>
              <option value="JAGO">JAGO</option>
              <option value="MANDIRI">MANDIRI</option>
              <option value="PERMATA">PERMATA</option>
              <option value="OVO">OVO</option>
            </select>
            {field.error && <div class="text-red-500">{field.error}</div>}
          </div>
        )}
      </Field>
      <Field name="bankName">
        {(field, props) => (
          <div>
            <input
              {...props}
              type="text"
              class="w-full text-black"
              value={field.value}
              placeholder="Nama Lengkap"
            />
            {field.error && <div class="text-red-500">{field.error}</div>}
          </div>
        )}
      </Field>
      <Field name="bankAccount">
        {(field, props) => (
          <div>
            <input
              {...props}
              type="text"
              value={field.value}
              class="w-full text-black"
              placeholder="Nomor Rekening"
            />
            {field.error && <div class="text-red-500">{field.error}</div>}
          </div>
        )}
      </Field>
      <Field name="referralCode">
        {(field, props) => (
          <div>
            <input
              {...props}
              type="text"
              class="w-full text-black"
              value={field.value}
              placeholder="Referral Code"
            />
            {field.error && <div class="text-red-500">{field.error}</div>}
          </div>
        )}
      </Field>
      <button type="submit" class="rounded bg-indigo-500 px-3 py-2 text-white">
        Register
      </button>
    </Form>
  );
});

export default App;
