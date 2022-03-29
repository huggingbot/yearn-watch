import	React, {MouseEvent, ReactElement}	from	'react';
import	Link								from	'next/link';
import	{TStrategy}							from	'contexts/useWatch';
import	{parseMarkdown}						from	'@lib/utils';
import	AddressWithActions					from	'@lib/components/AddressWithActions';
import	Card								from	'@lib/components/Card';
import	StatisticCard						from	'@lib/components/StatisticCard';
import	* as format							from	'@lib/utils/format';

type 		TStrategyBox = {strategy: TStrategy, symbol: string, decimals: number, vaultAddress: string, vaultExplorer: string}
function	StrategyBox({strategy, symbol, decimals, vaultAddress, vaultExplorer}: TStrategyBox): ReactElement {
	return (
		<Card backgroundColor={'bg-background'} className={'mb-4'}>
			<div className={'flex flex-row justify-between items-start md:items-center'}>
				<div>
					<b className={'mb-2 text-base text-typo-primary'}>{strategy.name}</b>
					<p className={'text-xs text-typo-secondary'}>
						{`Last report: ${strategy?.lastReport ? format.since(Number(strategy.lastReport) * 1000) : 'never'}`}
					</p>
					<AddressWithActions
						address={strategy.address}
						explorer={vaultExplorer}
						truncate={3}
						wrapperClassName={'flex md:hidden mt-2'}
						className={'font-mono text-sm text-typo-secondary'} />
				</div>
				<div className={'flex flex-row items-center'}>
					<AddressWithActions
						address={strategy.address}
						explorer={vaultExplorer}
						wrapperClassName={'hidden md:flex'}
						className={'font-mono text-sm text-typo-secondary'} />
					<div onClick={(e: MouseEvent): void => e.stopPropagation()}>
						<Link href={`/vault/${vaultAddress}/${strategy.address}`}>
							<button className={'mx-0 min-w-fit md:mr-10 md:ml-6 md:min-w-[132px] button button-outline'}>
								{'Details'}
							</button>
						</Link>
					</div>
				</div>
			</div>
			<div className={'my-6 w-full md:w-3/4'}>
				<p
					className={'text-sm text-typo-primary'}
					dangerouslySetInnerHTML={{__html: parseMarkdown((strategy?.description || '').replace(/{{token}}/g, symbol) || '')}} />
			</div>
			<StatisticCard.Wrapper>
				<StatisticCard
					label={'Total debt'}
					value={format.bigNumberAsAmount(strategy.totalDebt, decimals, 5)} />
				<StatisticCard
					label={'Credit available'}
					value={format.bigNumberAsAmount(strategy.creditAvailable, decimals, 4)} />
				<StatisticCard
					label={'Total Estimated Assets'}
					value={format.bigNumberAsAmount(strategy.estimatedTotalAssets, decimals, 4)} />
				<StatisticCard
					cols={{mobile: 1, desktop: 1}}
					label={'Debt ratio'}
					value={format.bigNumberAsAmount(strategy.debtRatio, 2, 2, '%')} />
				<StatisticCard
					cols={{mobile: 1, desktop: 1}}
					label={'Average APR'}
					value={`${format.amount((strategy?.apr || 0) * 100, 2)}%`} />
				<StatisticCard
					cols={{mobile: 1, desktop: 1}}
					label={'Index'}
					value={format.amount((strategy?.index === 21 ? -1 : strategy?.index || 0))} />
			</StatisticCard.Wrapper>
		</Card>
	);
}

export default StrategyBox;