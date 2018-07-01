import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

export default () => {
    return(
        <Menu style={{ marginTop: '10px' }}>
            <Link route="/">
            <a>
                <Menu.Item>
                        Crowd Coin
                </Menu.Item>
            </a>
            </Link>
            <Menu.Menu position='right'>
                <Link route="/">
                <a>
                    <Menu.Item>
                     Campaigns
                    </Menu.Item>
                </a>
                </Link>
                <Link route="/campaigns/new">
                <a>
                    <Menu.Item>
                        +
                    </Menu.Item>
                </a>
                </Link>
            </Menu.Menu>
        </Menu>
    );
};