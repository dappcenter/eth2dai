import classnames from 'classnames';
import * as moment from 'moment';
import * as React from 'react';
// @ts-ignore
import * as MdAccessTime from 'react-icons/lib/md/access-time';
// @ts-ignore
import * as MdCheck from 'react-icons/lib/md/check';
// @ts-ignore
// tslint:disable:import-name
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

import { Button } from '../utils/forms/Buttons';
import { Panel } from '../utils/panel/Panel';
import { Muted } from '../utils/text/Text';
import * as styles from './Migration.scss';

interface Props {
  continue: () => void;
}

export class Migration extends React.Component<Props> {

  public gotoOld = () => {
    window.open('https://old.eth2dai.com', '_blank');
  }

  public render() {
    const blog = 'https://www.reddit.com/r/OasisDEX/';
    const oldContract = '0xB7ac09C2c0217B07d7c103029B4918a2C401eeCB';
    const newContract = '0x39755357759ce0d7f32dc8dc45414cca409ae24e';
    const closingTime = moment(new Date('2019-02-15 17:00 UTC'));

    const minutes = closingTime.diff(moment(), 'minutes');
    const [d, h, m] = [Math.floor(minutes / 60 / 24), Math.floor(minutes / 60) % 24, minutes % 60];
    const closingIn = minutes < 0 ? undefined : `${d}d ${h < 10 ? '0' : ''}${h}:${m < 10 ? '0' : ''}${m}`;

    return (
      <section className={styles.section}>
        <Panel style={{ padding: '10px' }}>

          <div className={styles.container}>
            <h4 style={{ fontSize: '120%' }}>We are updating the Oasis contract!</h4>
          </div>
          <div className={styles.container} style={{ marginBottom: '10px' }}>
            <h4>For more information, check out the&ensp;
              <a target="_new" href={blog}>Blogpost</a>
            </h4>
          </div>

          <div className={styles.container}>
            <h4 style={{ fontWeight: 'bold' }}><Muted>Old contract</Muted></h4>
          </div>
          <div className={styles.container}>
            {closingIn
            ? <h4>
                <Muted>
                  <MdAccessTime size="20" style={{ marginBottom: '2px' }} /> will be closed in
                </Muted>
                &ensp;{closingIn}
              </h4>
            : <>
              <h4 className={styles.info}>
                <MdCheck size="20" style={{ verticalAlign: 'text-bottom' }} /> Contract and active orders have been closed!
              </h4>
              <h4 className={styles.info}>
                <MdCheck size="20" style={{ verticalAlign: 'text-bottom' }} /> Remaining funds have been returned
              </h4>
            </>
          }
          </div>
          <div className={styles.container}>
            <h4 className={classnames(styles.border, styles.address)}>
              <span className={styles.icon}>
                <Jazzicon diameter={25} seed={jsNumberForAddress(oldContract)} />
              </span>
              <a target="_new" href={`https://etherscan.io/address/${oldContract}`}>
                {oldContract}
              </a>
            </h4>
          </div>
          <div className={styles.container}>
            <Button disabled={!closingIn} size="md" color="greyWhite" onClick={this.gotoOld} style={{ width: '100%' }}>
              Cancel orders on old contract
            </Button>
          </div>

          <div className={styles.container}>
            <hr style={{ width: '100%' }} />
          </div>

          <div className={styles.container}>
            <h4 style={{ fontWeight: 'bold' }}><Muted>New contract</Muted></h4>
          </div>
          <div className={styles.container}>
            <h4 className={classnames(styles.border, styles.address)}>
              <span className={styles.icon}>
                <Jazzicon diameter={25} seed={jsNumberForAddress(newContract)} />
              </span>
              <a target="_new" href={`https://etherscan.io/address/${newContract}`}>
                {newContract}
              </a>
            </h4>
          </div>
          <div className={styles.container}>
            <Button data-test-id="continue-with-new-contract" size="md" color="greyWhite" onClick={this.props.continue} style={{ width: '100%' }}>
              Continue with new contract
            </Button>
          </div>

        </Panel>
      </section>
    );
  }

}
