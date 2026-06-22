import { useTranslation } from 'react-i18next';

export function PrivacyPolicyPage() {
  const { i18n } = useTranslation();
  const isId = i18n.language === 'id';

  return (
    <section className="pt-32 pb-24 px-6 md:px-12 max-w-[800px] mx-auto animate-fade-in-up">
      <h1 className="heading-1 mb-8">{isId ? "Kebijakan Privasi" : "Privacy Policy"}</h1>
      <p className="text-body text-text-secondary mb-12">{isId ? "Terakhir diperbarui: 22 Juni 2026" : "Last updated: June 22, 2026"}</p>
      
      <div className="prose prose-invert max-w-none prose-p:text-text-secondary prose-h2:text-text-primary prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4">
        {isId ? (
          <>
            <h2>1. Pendahuluan</h2>
            <p className="mb-4">AetherLabs ("kami") menghormati privasi Anda dan berkomitmen untuk melindungi data pribadi Anda. Kebijakan privasi ini akan memberi tahu Anda bagaimana kami menjaga data pribadi Anda saat Anda mengunjungi situs web kami dan memberi tahu Anda tentang hak privasi Anda serta bagaimana hukum melindungi Anda.</p>

            <h2>2. Data Yang Kami Kumpulkan Tentang Anda</h2>
            <p className="mb-4">Kami dapat mengumpulkan, menggunakan, menyimpan, dan mentransfer berbagai jenis data pribadi tentang Anda yang telah kami kelompokkan sebagai berikut:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 mb-4 text-text-secondary">
              <li><strong>Data Identitas</strong> mencakup nama depan, nama belakang, atau pengidentifikasi serupa.</li>
              <li><strong>Data Kontak</strong> mencakup alamat email dan nomor telepon.</li>
              <li><strong>Data Teknis</strong> mencakup alamat protokol internet (IP), jenis dan versi browser, pengaturan zona waktu, dan lokasi.</li>
            </ul>

            <h2>3. Bagaimana Kami Menggunakan Data Pribadi Anda</h2>
            <p className="mb-4">Kami hanya akan menggunakan data pribadi Anda ketika hukum mengizinkannya. Paling umum, kami akan menggunakan data pribadi Anda dalam keadaan berikut:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 mb-4 text-text-secondary">
              <li>Ketika kami perlu melaksanakan kontrak yang akan atau telah kami buat dengan Anda.</li>
              <li>Ketika diperlukan untuk kepentingan sah kami (atau pihak ketiga) dan kepentingan serta hak fundamental Anda tidak mengesampingkan kepentingan tersebut.</li>
              <li>Ketika kami harus mematuhi kewajiban hukum.</li>
            </ul>

            <h2>4. Keamanan Data</h2>
            <p className="mb-4">Kami telah menerapkan langkah-langkah keamanan yang tepat untuk mencegah data pribadi Anda hilang secara tidak sengaja, digunakan, atau diakses dengan cara yang tidak sah, diubah, atau diungkapkan. Selain itu, kami membatasi akses ke data pribadi Anda hanya kepada karyawan, agen, kontraktor, dan pihak ketiga lainnya yang memiliki kebutuhan bisnis untuk mengetahuinya.</p>

            <h2>5. Hubungi Kami</h2>
            <p className="mb-4">Jika Anda memiliki pertanyaan tentang kebijakan privasi ini atau praktik privasi kami, silakan hubungi kami di <strong>arvinindrawan@gmail.com</strong>.</p>
          </>
        ) : (
          <>
            <h2>1. Introduction</h2>
            <p className="mb-4">AetherLabs ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>

            <h2>2. The Data We Collect About You</h2>
            <p className="mb-4">We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 mb-4 text-text-secondary">
              <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
              <li><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location.</li>
            </ul>

            <h2>3. How We Use Your Personal Data</h2>
            <p className="mb-4">We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 mb-4 text-text-secondary">
              <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal obligation.</li>
            </ul>

            <h2>4. Data Security</h2>
            <p className="mb-4">We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.</p>

            <h2>5. Contact Us</h2>
            <p className="mb-4">If you have any questions about this privacy policy or our privacy practices, please contact us at <strong>arvinindrawan@gmail.com</strong>.</p>
          </>
        )}
      </div>
    </section>
  );
}
