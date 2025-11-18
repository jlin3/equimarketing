export default function ClientExplainerPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          How Your Portfolio Behaves in a Crisis
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A simple guide to understanding the strategies your advisor uses to protect and grow your wealth.
        </p>
      </div>

      <div className="space-y-12">
        <div className="border rounded-lg p-8 bg-card">
          <h2 className="text-2xl font-bold mb-4">The Challenge: Markets Don't Move in Straight Lines</h2>
          <p className="text-lg text-muted-foreground mb-4">
            Traditional portfolios of stocks and bonds have served investors well for decades. But when markets experience stress—like 2008, 2020, or 2022—both stocks and bonds can struggle at the same time.
          </p>
          <p className="text-lg text-muted-foreground">
            The portfolios most likely to meet your long-term goals are the ones you can stay invested in during difficult periods. That's where alternative strategies come in.
          </p>
        </div>

        <div className="border rounded-lg p-8 bg-card">
          <h2 className="text-2xl font-bold mb-4">What Are Alternative Strategies?</h2>
          <p className="text-lg text-muted-foreground mb-4">
            Alternative strategies (or "alts") are investments designed to perform differently than traditional stocks and bonds. Think of them as portfolio insurance that also aims to grow your wealth.
          </p>
          <div className="bg-accent/10 p-6 rounded-lg my-4">
            <h3 className="font-semibold text-lg mb-2">Key Benefits:</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• <strong>Smoother ride:</strong> Smaller drops when markets fall</li>
              <li>• <strong>Different sources of return:</strong> Not dependent on stock market going up</li>
              <li>• <strong>Better sleep:</strong> Less stress during market turmoil</li>
            </ul>
          </div>
        </div>

        <div className="border rounded-lg p-8 bg-card">
          <h2 className="text-2xl font-bold mb-4">How Your Advisor Uses These Strategies</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Your advisor has access to institutional-quality strategies typically reserved for large pension funds and endowments. Here's how they work for you:
          </p>
          
          <div className="space-y-6">
            <div className="border-l-4 border-primary pl-6">
              <h3 className="font-semibold text-lg mb-2">Enhanced Growth</h3>
              <p className="text-muted-foreground">
                Your equity allocation stays invested for long-term growth, but with an added layer of protection. In down markets, losses are limited. In up markets, you still participate in gains. Think of it as "growth with guardrails."
              </p>
            </div>

            <div className="border-l-4 border-primary pl-6">
              <h3 className="font-semibold text-lg mb-2">Steady Income</h3>
              <p className="text-muted-foreground">
                Income strategies that don't depend on traditional bond markets. These aim to provide consistent returns whether interest rates rise or fall, stock markets boom or bust.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-6">
              <h3 className="font-semibold text-lg mb-2">Portfolio Diversifier</h3>
              <p className="text-muted-foreground">
                Strategies designed to "zig when others zag"—performing well when stocks and bonds struggle. This helps keep your overall portfolio more stable through different market environments.
              </p>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-8 bg-card">
          <h2 className="text-2xl font-bold mb-4">What Makes This Different?</h2>
          <p className="text-lg text-muted-foreground mb-4">
            Unlike private equity or venture capital that lock up your money for years, these strategies are designed with liquidity in mind. You have regular access to your funds, with the kind of transparency you'd expect from any quality investment.
          </p>
          <div className="bg-accent/10 p-6 rounded-lg mt-4">
            <p className="text-muted-foreground">
              <strong>The bottom line:</strong> Your advisor is building a portfolio that's designed not just for good times, but for all times. The goal is to help you stay invested, stay calm, and stay on track toward your financial goals—no matter what markets throw at us.
            </p>
          </div>
        </div>

        <div className="border rounded-lg p-8 text-center bg-primary/5">
          <h2 className="text-2xl font-bold mb-4">Questions About Your Portfolio?</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Your advisor is here to explain how these strategies work within your specific financial plan.
          </p>
          <p className="text-muted-foreground">
            Every portfolio is different, and your advisor will help you understand exactly what you own and why.
          </p>
        </div>
      </div>

      <div className="mt-16 text-center text-sm text-muted-foreground">
        <p>
          This page is designed to help you understand general investment concepts. Specific performance, risks, and suitability 
          should be discussed with your financial advisor. Past performance does not guarantee future results.
        </p>
      </div>
    </div>
  );
}

