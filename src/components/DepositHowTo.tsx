import { component$ } from "@builder.io/qwik";

interface DepositHowToI {
  vaAccountNumber?: string;
  bank: string;
}

interface BankStep {
  title: string;
  html: string;
}

interface Banks {
  BCA: BankStep[];
  MANDIRI: BankStep[];
  PERMATA: BankStep[];
  BRI: BankStep[];
  BNI: BankStep[];
  CIMB: BankStep[];
  QRIS: BankStep[];
}

export const DepositHowTo = component$(
  ({ vaAccountNumber = "0", bank }: DepositHowToI) => {
    const banks: Banks = {
      BCA: [
        {
          title: "Mobile Banking BCA",
          html: `<ol style="list-style-type: disc" class="px-5" class="px-5">
        <li>Login Mobile Banking</li>
        <li>Pilih m-Transfer</li>
        <li>Pilih BCA Virtual Account</li>
        <li>Input Nomor Virtual Account <br/> <strong>${vaAccountNumber}</strong></li>
        <li>Klik Send</li>
        <li>Informasi Virtual Account akan di tampilkan</li>
        <li>Klik Ok</li>
        <li>Input PIN Mobile Banking</li>
        <li>Bukti bayar akan ditampilkan</li>
        <li>Selesai</li>
        </ol>`,
        },
        {
          title: "Internet Banking BCA",
          html: `<ol style="list-style-type: disc" class="px-5">
        <li>Login Internet Banking</li>
        <li>Pilih Transaksi Dana</li>
        <li>Pilih Transfer ke BCA Virtual Account</li>
        <li>Input nomor Virtual Account <br/> <strong>${vaAccountNumber}</strong></li>
        <li>Klik Lanjutkan</li>
        <li>Input Respon KeyBCA Appli 1</li>
        <li>Klik Kirim</li>
        <li>Selesai</li>
        </ol>`,
        },
        {
          title: "ATM BCA",
          html: `<ol style="list-style-type: disc" class="px-5">
        <li>Input kartu ATM dan PIN Anda</li>
        <li>Pilih Menu Transaksi Lainnya</li>
        <li>Pilih Transfer</li>
        <li>Pilih Ke rekening BCA Virtual Account</li>
        <li>Input Nomor Virtual Account <br/> <strong>${vaAccountNumber}</strong> </li>
        <li>Pilih Benar</li>
        <li>Pilih Ya</li>
        <li>Ambil bukti bayar anda</li>
        <li>Selesai</li>
        </ol>`,
        },
        {
          title: "ATN BANK LAIN",
          html: `<ol style="list-style-type: disc" class="px-5">
        <li>Masukan kartu ATM</li>
        <li>Pilih Bahasa Indonesia</li>
        <li>Masukan PIN ATM dengan benar</li>
        <li>Cari menu Transfer</li>
        <li>Pilih Transfer ke Bank Lain</li>
        <li>Masukan kode bank BCA("014") dilanjutkan dengan nomor rekening tujuan</li>
        <li>Masukan nominal yang ingin di transfer (Harus sesuai dengan Nilai transfer)</li>
        <li>Konfirmasi ulang transfer, jika benar maka pilih Benar</li>
        <li>Transfer antar bank akan diproses</li>
        </ol>`,
        },
      ],
      MANDIRI: [
        {
          title: "Banking BCA ke Mandiri",
          html: `<ol style="list-style-type: disc" class="px-5">
        <li>Login Banking BCA</li>
        <li>Pilih Menu "m-Transfer"</li>
        <li>Pilih Menu "Daftar Transfer - Antar Bank"</li>
        <li>Klik "No.Rekening Tujuan", Masukkan Nomor Virtual Account</li>
        <li>Klik "Bank" Pilih "MANDIRI"</li>
        <li>Klik Send.Klik OK.Input PIN.</li>
        <li>Pilih Menu "Transfer - Antar Bank"</li>
        <li>Klik "Bank" Pilih "MANDIRI"</li>
        <li>Klik "Ke Rekening Tujuan" dan Pilih "Nomor Virtual Account Untuk Bank Lain" baru saja menambahkan</li>
        <li>Klik "Jumlah Uang" dan Input "Nilai Transfer"</li>
        <li>Klik Send.Klik OK.Input PIN.</li>
        </ol>`,
        },
        {
          title: "non-Bank Mandiri",
          html: `<ol style="list-style-type: disc" class="px-5">
          <li>Input kartu ATM dan PIN Anda</li>
          <li>Pilih Bayar / Beli</li>
          <li>Pilih Lainnya</li>
          <li>Pilih Transfer Bank</li>
          <li>Pilih Bank Mandiri (008)</li>
          <li>Masukkan "89325",diikuti dengan nomor virtual account <br/><strong>${vaAccountNumber}</strong></li>
          <li>Masukkan Nominal Pembayaran (Sesuai nilai transfer)</li>
          <li>Lakukan Pembayaran</li>
          </ol>`,
        },
        {
          title: "Mandiri ATM",
          html: `<ol style="list-style-type: disc" class="px-5">
          <li>Input kartu ATM dan PIN Anda</li>
          <li>Pilih "Bayar / Beli"</li>
          <li>Pilih "Lainnya"</li>
          <li>Pilih "Multi Payment"</li>
          <li>Input 89325 ,sebagai Kode institusi</li>
          <li>Input Nomor Virtual Accournt <br/> <strong>${vaAccountNumber}</strong></li>
          <li>Pilih Benar</li>
          <li>Pilih Iya</li>
          <li>Ambil Bukti bayar Anda</li>
          <li>Selesai</li>
          </ol>`,
        },
        {
          title: "Mandiri Mobile Banking",
          html: `<ol style="list-style-type: disc" class="px-5">
          <li>Login "Mobile Banking"</li>				
          <li>Pilih "Bayar"</li>
          <li>Input 89325 ,sebagai "Penyedia jasa"</li>
          <li>Input Nomor Vitual Account <br/> <strong>${vaAccountNumber}</strong></li>
          <li>Pilih "Lanjut"</li>
          <li>Input "OTP and PIN"</li>
          <li>Pilih OK</li>
          <li>Bukti bayar ditampilkan</li>
          <li>Selesai</li>
          </ol>`,
        },
        {
          title: "Mandiri Internet Banking",
          html: `<ol style="list-style-type: disc" class="px-5">
          <li>Login "Internet Banking"</li>
          <li>Pilih "Bayar"</li>
          <li>Pilih "Multi payment"</li>
          <li>Input 89325 ,sebagai "Penyedia jasa"</li>
          <li>Input Nomor Virtual Account <br /> <strong>${vaAccountNumber}</strong></li>
          <li>Pilih "Lanjut"</li>
          <li>Input "OTP and PIN"</li>
          <li>Pilih OK</li>
          <li>Bukti bayar ditampilkan</li>
          <li>Selesai</li>
          </ol>`,
        },
        {
          title: "ATM BANK LAIN",
          html: `<ol style="list-style-type: disc" class="px-5">
          <li>Masukan kartu ATM</li>
          <li>Pilih Bahasa Indonesia</li>
          <li>Masukan PIN ATM dengan Benar</li>
          <li>Cari Menu Transfer</li>
          <li>dan Pilih Transfer ke Bank lain</li>
          <li>Masukan kode bank Mandiri("008") dilanjutkan dengan Nomor Virtual Account</li>
          <li>Masukan nominal yang ingin di transfer (sesuai nilai transfer)</li>
          <li>Konfirmasi ulang transfer, jika benar maka pilih Benar</li>
          <li>Transfer antar bank akan diproses</li>
          </ol>`,
        },
      ],
      PERMATA: [
        {
          title: "Banking BCA ke Permata",
          html: `<ol style="list-style-type: disc" class="px-5">
        <li>Login Banking BCA</li>
        <li>Pilih Menu "m-Transfer"</li>
        <li>Pilih Menu "Daftar Transfer - Antar Bank"</li>
        <li>Klik "No.Rekening Tujuan", Masukkan Nomor Virtual Account</li>
        <li>Klik "Bank" Pilih "PERMATA"</li>
        <li>Klik Send.Klik OK.Input PIN.</li>
        <li>Pilih Menu "Transfer - Antar Bank"</li>
        <li>Klik "Bank" Pilih "PERMATA"</li>
        <li>Klik "Ke Rekening Tujuan" dan Pilih "Nomor Virtual Account" baru saja menambahkan</li>
        <li>Klik "Jumlah Uang" dan Input "Nilai Transfer"</li>
        <li>Klik Send</li>
        <li>Klik OK</li>
        <li>Input PIN</li>
        </ol>`,
        },
        {
          title: "Mobile Banking Permata",
          html: `<ol style="list-style-type: disc" class="px-5">
          <li>Masuk ke mobile banking PermataNet Anda</li>
          <li>Pada menu utama, pilih menu "Pembayaran Tagihan"</li>
          <li>Pilih menu "Virtual Account"</li>
          <li>Masukkan nomor virtual account lalu pilih "OK"</li>
          <li>Periksa kembali data transaksi Anda dan selesaikan proses pembayaran</li>
          </ol>`,
        },
        {
          title: "Internet Banking Permata",
          html: `<ol style="list-style-type: disc" class="px-5">
          <li>Login ke internet banking PermataNet Anda</li>
          <li>Pada menu utama, pilih menu "Pembayaran Tagihan"</li>
          <li>Pilih menu "Virtual Account"</li>
          <li>Masukkan nomor virtual account lalu pilih "OK"</li>
          <li>Periksa kembali data transaksi Anda dan selesaikan proses pembayaran</li>
          <li>Selesaikan pembayaran dengan menggunakan Token Permata</li>
          </ol>`,
        },
        {
          title: "ATM Permata",
          html: `<ol style="list-style-type: disc" class="px-5">
          <li>Masukkan PIN ATM Anda</li>
          <li>Pada menu utama, pilih menu "Transaksi lainnya"</li>
          <li>Pilih menu "Transfer"</li>
          <li>Pilih menu "Ke Rekening Virtual Account"</li>
          <li>Masukkan nomor virtual account lalu pilih "OK"</li>
          <li>Periksa kembali data transaksi Anda dan selesaikan proses pembayaran</li>
          </ol>`,
        },
        {
          title: "ATM BANK LAIN",
          html: `<ol style="list-style-type: disc" class="px-5">
          <li>Masukan kartu ATM</li>
          <li>Pilih Bahasa Indonesia</li>
          <li>Masukan PIN ATM dengan Benar</li>
          <li>Cari Menu Transfer</li>
          <li>dan Pilih Transfer ke Bank lain</li>
          <li>Masukan kode bank PERMATA("013") dilanjutkan dengan Nomor Virtual Account</li>
          <li>Masukan nominal yang ingin di transfer (sesuai nilai transfer)</li>
          <li>Konfirmasi ulang transfer, jika benar maka pilih Benar</li>
          <li>Transfer antar bank akan diproses</li>
          </ol>`,
        },
      ],
      BRI: [
        {
          title: "Banking BCA ke BRI",
          html: `<ol style="list-style-type: disc" class="px-5">
        <li>Login Banking BCA</li>
        <li>Pilih Menu "m-Transfer"</li>
        <li>Pilih Menu "Daftar Transfer - Antar Bank"</li>
        <li>Klik "No.Rekening Tujuan", Masukkan Nomor Virtual Account</li>
        <li>Klik "Bank" Pilih "BRI"</li>
        <li>Klik Send</li>
        <li>Klik OK</li>
        <li>Input PIN</li>
        <li>Pilih Menu "Transfer - Antar Bank"</li>
        <li>Klik "Bank" Pilih "BRI"</li>
        <li>Klik "Ke Rekening Tujuan" dan Pilih "Nomor Virtual Account" baru saja menambahkan</li>
        <li>Klik "Jumlah Uang" dan Input "Nilai Transfer"</li>
        <li>Klik Send</li>
        <li>Klik OK</li>
        <li>Input PIN</li>
        </ol>`,
        },
        {
          title: "Mobile Banking BRI",
          html: `<ol style="list-style-type: disc" class="px-5">
          <li>Login BRI Mobile</li>
          <li>Pilih Mobile Banking BRI</li>
          <li>Pilih Menu Pembayaran</li>
          <li>Pilih Menu BRIVA</li>
          <li>Masukkan Nomor Virtual Account <br /><strong>${vaAccountNumber}</strong></li>
          <li>Masukkan Nominal (sesuai nilai transfer)</li>
          <li>Klik Kirim</li>
          <li>Masukkan PIN Mobile</li>
          <li>Klik Kirim</li>
          <li>Bukti bayar akan di kirim melalui sms</li>
          <li>Selesai</li>
          </ol>`,
        },
        {
          title: "Internet Banking BRI",
          html: `<ol style="list-style-type: disc" class="px-5">
          <li>Login Internet Banking</li>
          <li>Pilih Pembayaran</li>
          <li>Pilih BRIVA</li>
          <li>Masukkan Nomor Virtual Account <br/> <strong>${vaAccountNumber}</strong></li>
          <li>Klik Kirim</li>
          <li>Masukkan Password</li>
          <li>Masukkan mToken</li>
          <li>Klik kirim</li>
          <li>Bukti bayar akan ditampilkan</li>
          <li>Selesai</li>
          </ol>`,
        },
        {
          title: "ATM BRI",
          html: `<ol style="list-style-type: disc" class="px-5">
          <li>Input kartu ATM dan PIN Anda</li>
          <li>Pilih Menu Transaksi Lain</li>
          <li>Pilih Menu Pembayaran</li>
          <li>Pilih Menu Lain-lain</li>
          <li>Pilih Menu BRIVA</li>
          <li>Masukkan Nomor Virtual Account <br /><strong>${vaAccountNumber}</strong></li>
          <li>Pilih Ya</li>
          <li>Ambil bukti bayar anda</li>
          <li>Selesai</li>
          </ol>`,
        },
        {
          title: "ATM BANK LAIN",
          html: `<ol style="list-style-type: disc" class="px-5">
          <li>Masukan kartu ATM</li>
          <li>Pilih Bahasa Indonesia</li>
          <li>Masukan PIN ATM dengan Benar</li>
          <li>Cari Menu Transfer</li>
          <li>dan Pilih Transfer ke Bank lain</li>
          <li>Masukan kode bank BRI("002") dilanjutkan dengan Nomor Virtual Account</li>
          <li>Masukan nominal yang ingin di transfer (sesuai nilai transfer)</li>
          <li>Konfirmasi ulang transfer, jika benar maka pilih Benar</li>
          <li>Transfer antar bank akan diproses</li>
          </ol>`,
        },
      ],
      BNI: [
        {
          title: "Banking BCA ke BNI",
          html: `<ol style="list-style-type: disc" class="px-5">
        <li>Login Banking BCA</li>
        <li>Pilih Menu "m-Transfer"</li>
        <li>Pilih Menu "Daftar Transfer - Antar Bank"</li>
        <li>Klik "No.Rekening Tujuan", Masukkan Nomor Virtual Account</li>
        <li>Klik "Bank" Pilih "BNI"</li>
        <li>Klik Send</li>
        <li>Klik OK</li>
        <li>Input PIN</li>
        <li>Pilih Menu "Transfer - Antar Bank"</li>
        <li>Klik "Bank" Pilih "BNI"</li>
        <li>Klik "Ke Rekening Tujuan" dan Pilih "Nomor Virtual Account" baru saja menambahkan</li>
        <li>Klik "Jumlah Uang" dan Input "Nilai Transfer"</li>
        <li>Klik Send</li>
        <li>Klik OK</li>
        <li>Input PIN</li>
        </ol>`,
        },
        {
          title: "Mobile Banking BNI",
          html: `<ol style="list-style-type: disc" class="px-5">
  <li>Akses BNI Mobile Banking dari handphone kemudian masukkan user ID dan password</li>
  <li>Pilih menu “Transfer”</li>
  <li>Pilih menu “Virtual Account Billing” kemudian pilih rekening debet</li>
  <li>Masukkan Nomor Virtual Account Anda (contoh: ${vaAccountNumber}) pada menu “input baru”</li>
  <li>Tagihan yang harus dibayarkan akan muncul pada layar konfirmasi</li>
  <li>Konfirmasi transaksi dan masukkan Password Transaksi</li>
  <li>Pembayaran Anda Telah Berhasil</li>
  </ol>`,
        },
        {
          title: "iBank Personal BNI",
          html: `<ol style="list-style-type: disc" class="px-5">
  <li>Ketik alamat https://ibank.bni.co.id kemudian klik “Enter”</li>
  <li>Masukkan User ID dan Password</li>
  <li>Pilih menu “Transfer”</li>
  <li>Pilih “Virtual Account Billing”</li>
  <li>Kemudian masukan Nomor Virtual Account Anda (contoh: ${vaAccountNumber}) yang hendak dibayarkan. Lalu pilih rekening debet yang akan digunakan. Kemudian tekan ‘’lanjut’’</li>
  <li>Kemudian tagihan yang harus dibayarkan akan muncul pada layar konfirmasi</li>
  <li>Masukkan Kode Otentikasi Token</li>
  <li>Pembayaran Anda telah berhasil</li>
  </ol>`,
        },
        {
          title: "ATM BNI",
          html: `<ol style="list-style-type: disc" class="px-5">
  <li>Masukkan Kartu Anda</li>
  <li>Pilih Bahasa</li>
  <li>Masukkan PIN ATM Anda</li>
  <li>Pilih "Menu Lainnya"</li>
  <li>Pilih "Transfer"</li>
  <li>Pilih Jenis rekening yang akan Anda gunakan (Contoh: "Dari Rekening Tabungan")</li>
  <li>Pilih “Virtual Account Billing”</li>
  <li>Masukkan Nomor Virtual Account Anda (contoh: ${vaAccountNumber})</li>
  <li>Tagihan yang harus dibayarkan akan muncul pada layar konfirmasi</li>
  <li>Konfirmasi, apabila telah sesuai, lanjutkan transaksi</li>
  <li>Transaksi Anda telah selesai</li>
  </ol>`,
        },
        {
          title: "ATM Bersama",
          html: `<ol style="list-style-type: disc" class="px-5">
  <li>Masukkan kartu ke mesin ATM Bersama</li>
  <li>Pilih "Transaksi Lainnya"</li>
  <li>Pilih menu "Transfer"</li>
  <li>Pilih "Transfer ke Bank Lain"</li>
  <li>Masukkan kode bank BNI (009) dan 16 Digit Nomor Virtual Account (contoh: ${vaAccountNumber})</li>
  <li>Masukkan nominal transfer sesuai nilai transfer. Nominal yang berbeda tidak dapat diproses</li>
  <li>Konfirmasi rincian Anda akan tampil di layar, cek dan tekan 'Ya' untuk melanjutkan</li>
  <li>Transaksi Berhasil</li>
  </ol>`,
        },
        {
          title: "Bank Lain",
          html: `<ol style="list-style-type: disc" class="px-5">
  <li>Pilih menu "Transfer antar bank" atau “Transfer online antarbank”</li>
  <li>Masukkan kode bank BNI (009) atau pilih bank yang dituju yaitu BNI</li>
  <li>Masukan 16 Digit Nomor Virtual Account pada kolom rekening tujuan, (contoh: ${vaAccountNumber})</li>
  <li>Masukkan Nominal transfer sesuai nilai transfer. Nominal yang berbeda tidak dapat diproses</li>
  <li>Masukkan jumlah pembayaran</li>
  <li>Konfirmasi rincian Anda akan tampil di layar, cek dan apabila sudah sesuai silahkan lanjutkan transaksi sampai dengan selesai</li>
  <li>Transaksi Berhasil</li>
  </ol>`,
        },
        {
          title: "BNI sms banking",
          html: `<ol style="list-style-type: disc" class="px-5">
  <li>Buka aplikasi SMS Banking BNI</li>
  <li>Pilih menu Transfer</li>
  <li>Pilih menu Trf rekening BNI</li>
  <li>Masukkan Nomor rekening tujuan dengan 16 digit Nomor Virtual Account (contoh: ${vaAccountNumber})</li>
  <li>Masukkan Nominal transfer sesuai nilai transfer. Nominal yang berbeda tidak dapat diproses</li>
  <li>Pilih “Proses” kemudian “Setuju”</li>
  <li>Reply sms dengan ketik pin sesuai perintah</li>
  <li>Transaksi Berhasil</li>
  </ol>
  Atau Dapat juga langsung mengetik sms dengan format:<br/>
  TRF[SPASI]NomorVA[SPASI]NOMINAL<br/>
  dan kemudian kirim ke 3346<br />
  Contoh : TRF ${vaAccountNumber} 44000
  `,
        },
        {
          title: "OVO",
          html: `<ol style="list-style-type: disc" class="px-5">
  <li>Buka aplikasi OVO</li>
  <li>Pilih menu Transfer</li>
  <li>Pilih “Rekening Bank”</li>
  <li>Masukkan kode bank BNI (009) atau pilih bank yang dituju yaitu BNI</li>
  <li>Masukan 16 Digit Nomor Virtual Account pada kolom rekening tujuan, (contoh: ${vaAccountNumber})</li>
  <li>Masukkan Nominal transfer sesuai nilai transfer</li>
  <li>Pilih “Transfer”</li>
  <li>Konfirmasi rincian Anda akan tampil di layar, cek dan apabila sudah sesuai silahkan pilih “Konfirmasi” untuk lanjutkan transaksi sampai dengan selesai</li>
  <li>Transaksi Berhasil</li>
  </ol>`,
        },
      ],
      CIMB: [
        {
          title: "Banking BCA ke CIMB",
          html: `<ol style="list-style-type: disc" class="px-5">
        <li>Login Banking BCA</li>
        <li>Pilih Menu "m-Transfer"</li>
        <li>Pilih Menu "Daftar Transfer - Antar Bank"</li>
        <li>Klik "No.Rekening Tujuan", Masukkan Nomor Virtual Account</li>
        <li>Klik "Bank" Pilih "CIMB"</li>
        <li>Klik Send</li>
        <li>Klik OK</li>
        <li>Input PIN</li>
        <li>Pilih Menu "Transfer - Antar Bank"</li>
        <li>Klik "Bank" Pilih "CIMB"</li>
        <li>Klik "Ke Rekening Tujuan" dan Pilih "Nomor Virtual Account" baru saja menambahkan</li>
        <li>Klik "Jumlah Uang" dan Input "Nilai Transfer"</li>
        <li>Klik Send</li>
        <li>Klik OK</li>
        <li>Input PIN</li>
        </ol>`,
        },
        {
          title: "ATM CIMB",
          html: `<ol style="list-style-type: disc" class="px-5">
  <li>Input kartu ATM dan PIN Anda</li>
  <li>Pilih Menu Pembayaran</li>
  <li>Pilih Menu Lanjut</li>
  <li>Pilih Menu Virtual Account</li>
  <li>Masukkan Nomor Virtual Account</li>
  <li>Pilih Proses</li>
  <li>Data Virtual Account akan ditampilkan</li>
  <li>Pilih Proses</li>
  <li>Ambil bukti bayar anda</li>
  <li>Selesai</li>
  </ol>`,
        },
        {
          title: "Mobile Banking CIMB",
          html: `<ol style="list-style-type: disc" class="px-5">
  <li>Login Go Mobile</li>
  <li>Pilih Menu Transfer</li>
  <li>Pilih Menu Transfer ke CIMB Niaga Lain</li>
  <li>Pilih Sumber Dana yang akan digunakan</li>
  <li>Masukkan Nomor Virtual Account</li>
  <li>Masukkan Nominal</li>
  <li>Klik Lanjut</li>
  <li>Data Virtual Account akan ditampilkan</li>
  <li>Masukkan PIN Mobile</li>
  <li>Klik Konfirmasi</li>
  <li>Bukti bayar akan dikirim melalui sms</li>
  <li>Selesai</li>
  </ol>`,
        },
        {
          title: "Internet Banking CIMB",
          html: `<ol style="list-style-type: disc" class="px-5">
  <li>Login Internet Banking</li>
  <li>Pilih Bayar Tagihan</li>
  <li>Rekening Sumber - Pilih yang akan Anda digunakan</li>
  <li>Jenis Pembayaran - Pilih Virtual Account</li>
  <li>Untuk Pembayaran - Pilih Masukkan Nomor Virtual Account</li>
  <li>Nomor Rekening Virtual</li>
  <li>Isi Remark Jika diperlukan</li>
  <li>Klik Lanjut</li>
  <li>Data Virtual Account akan ditampilkan</li>
  <li>Masukkan mPIN</li>
  <li>Klik Kirim</li>
  <li>Bukti bayar akan ditampilkan</li>
  <li>Selesai</li>
  </ol>`,
        },
        {
          title: "ATM BANK LAIN",
          html: `<ol style="list-style-type: disc" class="px-5">
  <li>Masukan kartu ATM</li>
  <li>Pilih Bahasa Indonesia</li>
  <li>Masukan PIN ATM dengan Benar</li>
  <li>Cari Menu Transfer</li>
  <li>dan Pilih Transfer ke Bank lain</li>
  <li>Masukan kode bank CIMB("022") dilanjutkan dengan nomor rekening tujuan</li>
  <li>Masukan nominal yang ingin di transfer</li>
  <li>Konfirmasi ulang transfer, jika benar maka pilih Benar</li>
  <li>Transfer antar bank akan diproses</li>
  </ol>`,
        },
      ],
      QRIS: [
        {
          title: "Dari DANA",
          html: `<ol style="list-style-type: disc" class="px-5" >
              <li>Tap tombol "Simpan Kode di Perangkat" lalu tap Download</li>
              <li>Buka aplikasi DANA</li>
              <li>Pilih menu PAY </li>
              <li>Tap icon tambah gambar di sebelah kiri atas, lalu pilih gambar kode QR yang sebelumnya telah di simpan</li>
              <li>Selesaikan transaksi</li>
              </ol>`,
        },
        {
          title: "Dari OVO",
          html: `<ol style="list-style-type: disc" class="px-5">
              <li>Tap tombol "Simpan Kode di Perangkat" lalu tap Download</li>
              <li>Buka aplikasi OVO</li>
              <li>Pilih menu QRIS</li>
              <li>Tap icon tambah gambar, lalu pilih gambar kode QR yang sebelumnya telah di simpan</li>
              <li>Selesaikan transaksi</li>
              </ol>`,
        },
        {
          title: "Dari GoJek(Gopay)",
          html: `<ol style="list-style-type: disc" class="px-5">
              <li>Tap tombol "Simpan Kode di Perangkat" lalu tap Download</li>
              <li>Buka aplikasi GoJek</li>
              <li>Pilih menu Bayar</li>
              <li>Tap icon tambah gambar, lalu pilih gambar kode QR yang sebelumnya telah di simpan</li>
              <li>Selesaikan transaksi</li>
              </ol>`,
        },
        {
          title: "Dari M-BCA",
          html: `<ol style="list-style-type: disc" class="px-5">
              <li>Tap tombol "Simpan Kode di Perangkat" lalu tap Download</li>
              <li>Buka aplikasi M-BCA</li>
              <li>Pilih menu QRIS</li>
              <li>Tap icon tambah gambar, lalu pilih gambar kode QR yang sebelumnya telah di simpan</li>
              <li>Selesaikan transaksi</li>
              </ol>`,
        },
      ],
    };

    const faqs = banks[bank as keyof Banks];
    return (
      <div class="min-h-sceen bg-altBackground mx-2 max-w-screen-xl rounded-md px-5 md:m-0">
        <div class="mx-auto grid max-w-xl divide-y divide-black">
          {faqs.map((faq, id) => (
            <div class="py-3" key={id}>
              <details class="group">
                <summary class="flex cursor-pointer list-none items-center justify-between">
                  <span> {faq.title}</span>
                  <span class="transition group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      shapeRendering="geometricPrecision"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <div
                  class="va-howto-content w-full"
                  dangerouslySetInnerHTML={faq.html}
                />
              </details>
            </div>
          ))}
        </div>
      </div>
    );
  },
);
