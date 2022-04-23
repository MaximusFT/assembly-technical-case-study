import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, Modal, List, Typography, Space } from 'antd';

import IconLoad from '../components/IconLoad';
import Lang from '../components/Lang';
import { useGetAdditionalInfoQuery } from '../core/api';

const IconText = ({ icon, text }) => (
  <Space align="center">
    <IconLoad src={icon} />
    {text}
  </Space>
);

IconText.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
};

const FollowersListItem = ({ item }) => {
  return (
    <List.Item key={item.id}>
      <List.Item.Meta
        avatar={
          <a href={item.html_url} target="_blank" rel="noreferrer">
            <Avatar src={item.avatar_url} />
          </a>
        }
      />
      <Typography.Paragraph copyable={item.login} className="flex-fill mb-0">
        {item.login}
      </Typography.Paragraph>
    </List.Item>
  );
};

FollowersListItem.propTypes = {
  item: PropTypes.object,
};

const ReposListItem = ({ item }) => {
  return (
    <List.Item
      key={item.id}
      actions={[
        <IconText icon="star" text={item.stargazers_count} key="stargazers_count" />,
        <IconText icon="fork" text={item.forks_count} key="forks_count" />,
        <IconText icon="eye" text={item.watchers} key="watchers" />,
      ]}
    >
      <List.Item.Meta
        title={
          <a href={item.html_url} target="_blank" rel="noreferrer">
            {item.name}
          </a>
        }
        description={item.description}
      />
    </List.Item>
  );
};

ReposListItem.propTypes = {
  item: PropTypes.object,
};

const PopupRepos = () => {
  const navigate = useNavigate();
  const { modalType, login } = useParams();
  const { data, isLoading, isFetching } = useGetAdditionalInfoQuery({ login, modalType });

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Modal
      title={
        modalType === 'repos' ? (
          <Lang id="Common.RepositoryList" />
        ) : (
          <Lang id="Common.FollowerList" />
        )
      }
      visible={true}
      footer={null}
      onCancel={handleCancel}
    >
      <List
        loading={isLoading || isFetching}
        bordered
        size="small"
        dataSource={data || []}
        renderItem={item =>
          modalType === 'repos' ? <ReposListItem item={item} /> : <FollowersListItem item={item} />
        }
      />
    </Modal>
  );
};

export default PopupRepos;
