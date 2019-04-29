import { BigNumber } from 'bignumber.js';
import classnames from 'classnames';
import * as React from 'react';
import { NetworkConfig, tokens } from '../../blockchain/config';
import { TxStatus } from '../../blockchain/transactions';
import accountSvg from '../../icons/account.svg';
import doneSvg from '../../icons/done.svg';
import { Approximate } from '../../utils/Approximate';
import { formatPrice } from '../../utils/formatters/format';
import { Money } from '../../utils/formatters/Formatters';
import { SvgImage } from '../../utils/icons/utils';
import { CurrentPrice } from '../CurrentPrice';
import { TradeData } from '../details/TradeData';
import { TxStatusRow } from '../details/TxStatusRow';
import * as styles from '../Instant.scss';
import { InstantFormChangeKind, ManualChange, Progress, ProgressKind, ViewKind } from '../instantForm';
import { InstantFormWrapper } from '../InstantFormWrapper';
import { ProgressReport } from '../progress/ProgressReport';

interface ViewProps {
  change: (change: ManualChange) => void;
  progress: Progress;
  sellToken: string;
  buyToken: string;
  sellAmount: BigNumber;
  buyAmount: BigNumber;
  price: BigNumber;
  quotation: string;
  context: NetworkConfig;
}

export class FinalizationView extends React.Component<ViewProps> {

  public render() {
    const {
      sellToken,
      sellAmount,
      buyToken,
      buyAmount,
      price,
      quotation,
      progress,
    } = this.props;

    return (
      <InstantFormWrapper heading="Finalize Trade"
                          btnAction={this.resetForm}
                          btnDisabled={!(progress && progress.done)}
                          btnLabel="Trade Again">
        <CurrentPrice price={price} quotation={quotation}/>
        {
          progress && progress.kind === ProgressKind.noProxyNoAllowancePayWithERC20 &&
          <>
            <div className={classnames(styles.details, styles.transaction)}>
              <TxStatusRow icon={<SvgImage image={accountSvg}/>}
                           label={
                             <TradeData
                               data-test-id="create-proxy"
                               theme="reversed"
                               label="Create Account"
                               info="Something about Proxy"
                             />}
                           status={<ProgressReport report={this._proxyProgress()}/>}/>
            </div>
            <div className={classnames(styles.details, styles.transaction)}>
              <TxStatusRow icon={<SvgImage image={doneSvg}/>}
                           label={
                             <TradeData
                               data-test-id="set-token-allowance"
                               theme="reversed"
                               label={`Unlock ${sellToken.toUpperCase()}`}
                               info="Something about allowances"
                             />}
                           status={<ProgressReport report={this._allowanceProgress()}/>}/>
            </div>
            <div className={classnames(styles.details, styles.transaction)}>
              <TxStatusRow icon={tokens[sellToken].iconColor}
                           label={
                             <TradeData
                               data-test-id="pay-token"
                               theme="reversed"
                               label="Sell"
                               value={
                                 <Money formatter={formatPrice} value={sellAmount}
                                        token={sellToken}/>
                               }
                             />}
                           status={<ProgressReport
                             report={this._tradeProgress()}/>}
              />
              <TxStatusRow icon={tokens[buyToken].iconColor}
                           label={
                             <TradeData
                               data-test-id="buy-token"
                               theme="reversed"
                               label="Buy"
                               value={
                                 <Approximate>
                                   <Money formatter={formatPrice} value={buyAmount}
                                          token={buyToken}/>
                                 </Approximate>
                               }
                             />}/>
            </div>
          </>
        }
        {
          progress && progress.kind === ProgressKind.proxyNoAllowancePayWithERC20 &&
          <>
            <div className={classnames(styles.details, styles.transaction)}>
              <TxStatusRow icon={<SvgImage image={doneSvg}/>}
                           label={
                             <TradeData
                               data-test-id="set-token-allowance"
                               theme="reversed"
                               label={`Unlock ${sellToken.toUpperCase()}`}
                               info="Something about allowances"
                             />}
                           status={<ProgressReport report={this._allowanceProgress()}/>}/>
            </div>
            <div className={classnames(styles.details, styles.transaction)}>
              <TxStatusRow icon={tokens[sellToken].iconColor}
                           label={
                             <TradeData
                               data-test-id="pay-token"
                               theme="reversed"
                               label="Sell"
                               value={
                                 <Money formatter={formatPrice} value={sellAmount}
                                        token={sellToken}/>
                               }
                             />}
                           status={<ProgressReport report={this._tradeProgress()}/>}/>
              <TxStatusRow icon={tokens[buyToken].iconColor}
                           label={
                             <TradeData
                               data-test-id="buy-token"
                               theme="reversed"
                               label="Buy"
                               value={
                                 <Approximate>
                                   <Money formatter={formatPrice} value={buyAmount}
                                          token={buyToken}/>
                                 </Approximate>
                               }
                             />}/>
            </div>
          </>
        }
        {
          progress && progress.kind === ProgressKind.proxyAllowancePayWithERC20 &&
          <>
            <div className={classnames(styles.details, styles.transaction)}>
              <TxStatusRow icon={tokens[sellToken].iconColor}
                           label={
                             <TradeData
                               data-test-id="pay-token"
                               theme="reversed"
                               label="Sell"
                               value={
                                 <Money formatter={formatPrice} value={sellAmount}
                                        token={sellToken}/>
                               }
                             />}
                           status={<ProgressReport report={this._tradeProgress()}/>}/>
              <TxStatusRow icon={tokens[buyToken].iconColor}
                           label={
                             <TradeData
                               data-test-id="buy-token"
                               theme="reversed"
                               label="Buy"
                               value={
                                 <Approximate>
                                   <Money formatter={formatPrice} value={buyAmount}
                                          token={buyToken}/>
                                 </Approximate>
                               }
                             />}/>
            </div>
          </>
        }
        {
          progress && progress.kind === ProgressKind.noProxyPayWithETH &&
          <>
            <div className={classnames(styles.details, styles.transaction)}>
              <TxStatusRow icon={<SvgImage image={accountSvg}/>}
                           label={
                             <TradeData
                               data-test-id="create-proxy"
                               theme="reversed"
                               label="Create Account"
                               info="Something about Proxy"
                             />}
                           status={<ProgressReport report={this._tradeProgress()}/>}/>
              <TxStatusRow icon={tokens[sellToken].iconColor}
                           label={
                             <TradeData
                               data-test-id="pay-token"
                               theme="reversed"
                               label="Sell"
                               value={
                                 <Money formatter={formatPrice} value={sellAmount}
                                        token={sellToken}/>
                               }
                             />}
              />
              <TxStatusRow icon={tokens[buyToken].iconColor}
                           label={
                             <TradeData
                               data-test-id="buy-token"
                               theme="reversed"
                               label="Buy"
                               value={
                                 <Approximate>
                                   <Money formatter={formatPrice} value={buyAmount}
                                          token={buyToken}/>
                                 </Approximate>
                               }
                             />}
              />
            </div>
          </>
        }
        {
          progress && progress.kind === ProgressKind.proxyPayWithETH &&
          <>
            <div className={classnames(styles.details, styles.transaction)}>
              <TxStatusRow icon={tokens[sellToken].iconColor}
                           label={
                             <TradeData
                               data-test-id="pay-token"
                               theme="reversed"
                               label="Sell"
                               value={
                                 <Money formatter={formatPrice} value={sellAmount}
                                        token={sellToken}/>
                               }
                             />}
                           status={<ProgressReport report={this._tradeProgress()}/>}/>
              <TxStatusRow icon={tokens[buyToken].iconColor}
                           label={
                             <TradeData
                               data-test-id="buy-token"
                               theme="reversed"
                               label="Buy"
                               value={
                                 <Approximate>
                                   <Money formatter={formatPrice} value={buyAmount}
                                          token={buyToken}/>
                                 </Approximate>
                               }
                             />}/>
            </div>
          </>
        }

      </InstantFormWrapper>
    );
  }

  private resetForm = () => {
    this.props.change({
      kind: InstantFormChangeKind.formResetChange
    });

    this.props.change({
      kind: InstantFormChangeKind.viewChange,
      view: ViewKind.new
    });
  }

  private _tradeProgress = () => {
    const { tradeTxStatus: txStatus, tradeTxHash: txHash } = this.props.progress as {
      tradeTxStatus: TxStatus,
      tradeTxHash: string
    };

    return this._createReport(txStatus, txHash);
  }

  private _proxyProgress = () => {
    const { proxyTxStatus: txStatus, proxyTxHash: txHash } = this.props.progress as {
      proxyTxStatus: TxStatus,
      proxyTxHash: string
    };

    return this._createReport(txStatus, txHash);
  }

  private _allowanceProgress = () => {
    const { allowanceTxStatus: txStatus, allowanceTxHash: txHash } = this.props.progress as {
      allowanceTxStatus: TxStatus,
      allowanceTxHash: string
    };

    return this._createReport(txStatus, txHash);
  }

  private _createReport = (txStatus: TxStatus, txHash: string) => ({
    txStatus,
    txHash,
    etherscanURI: this.props.context.etherscan.url
  })
}
