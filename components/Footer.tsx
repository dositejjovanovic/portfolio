export default function Footer() {
  return (
    <footer
      className="
        py-8
        px-8
        border-t
        border-zinc-900
      "
    >

      <div
        className="
          max-w-7xl
          mx-auto
          flex
          justify-between
          items-center
          text-sm
          text-zinc-500
        "
      >

        <p>
          © {new Date().getFullYear()} Dositej Jovanović
        </p>


        <p>
          Built with Next.js
        </p>

      </div>

    </footer>
  );
}