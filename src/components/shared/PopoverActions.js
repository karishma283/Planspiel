//Taleh Muzaffarov and Rajat Ghosh

import React, { Component } from 'react'
import { Popover } from 'antd-mobile';
import { Card, Avatar, Drawer, Menu } from 'antd'
import { EllipsisOutlined, ShareAltOutlined, SaveOutlined, DownloadOutlined } from '@ant-design/icons'

const PopItem = Popover.Item;
export default class PopoverActions extends Component {
    render() {
        return (
            <Popover mask
                overlayClassName="fortest"
                overlayStyle={{ color: 'currentColor' }}
                visible={false}
                overlay={[
                    (<PopItem key="4" value="scan" icon={<SaveOutlined />} data-seed="logId">Save Article</PopItem>),
                    (<PopItem key="5" value="special" icon={<DownloadOutlined />} style={{ whiteSpace: 'nowrap' }}>Download Audio</PopItem>),
                    (<PopItem key="6" value="button ct" icon={<ShareAltOutlined />}>
                        <span style={{ marginRight: 5 }}>Share</span>
                    </PopItem>),
                ]}
                align={{
                    overflow: { adjustY: 0, adjustX: 0 },
                    offset: [-10, 0],
                }}
                onVisibleChange={() => this.handleVisibleChange(1)}
                onSelect={this.onSelect}
            >
                <div style={{
                    height: '100%',
                    width: '25px',
                    marginRight: '-10px',
                    display: 'flex',
                    alignItems: 'center',
                    float: 'right'
                }}
                >
                    <EllipsisOutlined />
                </div>
            </Popover>
        )
    }
}
