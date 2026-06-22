import { useTranslation } from 'react-i18next';

export function TermsPage() {
  const { i18n } = useTranslation();
  const isId = i18n.language === 'id';

  return (
    <section className="pt-32 pb-24 px-6 md:px-12 max-w-[800px] mx-auto animate-fade-in-up">
      <h1 className="heading-1 mb-8">{isId ? "Syarat dan Ketentuan" : "Terms of Service"}</h1>
      <p className="text-body text-text-secondary mb-12">{isId ? "Terakhir diperbarui: 22 Juni 2026" : "Last updated: June 22, 2026"}</p>
      
      <div className="prose prose-invert max-w-none prose-p:text-text-secondary prose-h2:text-text-primary prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4">
        {isId ? (
          <>
            <h2>1. Persetujuan Syarat dan Ketentuan</h2>
            <p className="mb-4">Dengan mengakses atau menggunakan layanan kami, Anda setuju untuk terikat oleh Syarat dan Ketentuan ini. Jika Anda tidak setuju dengan bagian mana pun dari persyaratan, maka Anda tidak boleh mengakses layanan kami. AetherLabs adalah agensi pengembangan perangkat lunak yang menyediakan pengembangan web kustom, seluler, dan skrip FiveM.</p>

            <h2>2. Hak Kekayaan Intelektual</h2>
            <p className="mb-4">Selain konten yang Anda miliki, berdasarkan Syarat ini, AetherLabs dan/atau pemberi lisensinya memiliki semua hak kekayaan intelektual dan materi yang terkandung dalam Situs Web ini. Untuk pekerjaan klien khusus, hak kekayaan intelektual akan ditransfer sebagaimana diuraikan dalam kontrak proyek tertentu dan hanya setelah pembayaran penuh.</p>

            <h2>3. Layanan & Ruang Lingkup Pekerjaan</h2>
            <p className="mb-4">Semua proyek pengembangan perangkat lunak akan diatur oleh Pernyataan Kerja (Statement of Work/SOW) atau Perjanjian Layanan Utama (Master Service Agreement/MSA) yang terpisah. Syarat-syarat ini mengatur penggunaan umum Anda atas situs web AetherLabs dan komunikasi awal. Setiap garis waktu atau perkiraan yang diberikan sebelum kontrak ditandatangani bersifat tidak mengikat.</p>

            <h2>4. Batasan Tanggung Jawab</h2>
            <p className="mb-4">Dalam hal apa pun AetherLabs, maupun pejabat, direktur, dan karyawannya, tidak akan dimintai pertanggungjawaban atas apa pun yang timbul dari atau dengan cara apa pun terkait dengan penggunaan Anda atas Situs Web ini. AetherLabs tidak akan bertanggung jawab atas kewajiban tidak langsung, konsekuensial, atau khusus yang timbul dari atau dengan cara apa pun terkait dengan penggunaan Anda atas Situs Web ini.</p>

            <h2>5. Hukum yang Berlaku & Yurisdiksi</h2>
            <p className="mb-4">Syarat-syarat ini akan diatur oleh dan ditafsirkan sesuai dengan hukum negara Indonesia, dan Anda tunduk pada yurisdiksi non-eksklusif pengadilan negara yang berlokasi di Indonesia untuk penyelesaian sengketa apa pun.</p>
          </>
        ) : (
          <>
            <h2>1. Agreement to Terms</h2>
            <p className="mb-4">By accessing or using our services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access our services. AetherLabs is a software development agency providing custom web, mobile, and FiveM script development.</p>

            <h2>2. Intellectual Property Rights</h2>
            <p className="mb-4">Other than the content you own, under these Terms, AetherLabs and/or its licensors own all the intellectual property rights and materials contained in this Website. For custom client work, intellectual property rights will be transferred as outlined in the specific project contract and only upon full payment.</p>

            <h2>3. Services & Scope of Work</h2>
            <p className="mb-4">All software development projects will be governed by a separate Statement of Work (SOW) or Master Service Agreement (MSA). These terms govern your general use of the AetherLabs website and preliminary communications. Any timelines or estimates provided prior to a signed contract are non-binding.</p>

            <h2>4. Limitation of Liability</h2>
            <p className="mb-4">In no event shall AetherLabs, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. AetherLabs, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.</p>

            <h2>5. Governing Law & Jurisdiction</h2>
            <p className="mb-4">These Terms will be governed by and interpreted in accordance with the laws of Indonesia, and you submit to the non-exclusive jurisdiction of the state and federal courts located in Indonesia for the resolution of any disputes.</p>
          </>
        )}
      </div>
    </section>
  );
}
