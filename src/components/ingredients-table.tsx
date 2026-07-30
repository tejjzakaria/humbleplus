import { FadeIn } from "@/components/motion/reveal";

interface Row {
  name: string;
  amount: string;
}

export function IngredientsTable({
  title,
  subtitle,
  rows,
}: {
  title: string;
  subtitle: string;
  rows: Row[];
}) {
  return (
    <section className="py-16 sm:py-20">
      <FadeIn className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
          {title}
        </h2>
        <p className="mt-2 text-base text-muted-foreground">{subtitle}</p>

        <div className="mt-6 overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-start text-sm">
            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={row.name}
                  className={index % 2 === 0 ? "bg-card" : "bg-muted/40"}
                >
                  <td className="px-5 py-3.5 font-medium text-foreground">
                    {row.name}
                  </td>
                  <td className="px-5 py-3.5 text-end text-muted-foreground">
                    {row.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FadeIn>
    </section>
  );
}
