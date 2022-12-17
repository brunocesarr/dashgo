import React from 'react';
import { Flex, Avatar, Box, Text } from '@chakra-ui/react';

interface ProfileProps {
  showProfileData: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Bruno César</Text>
          <Text color="gray.300" fontSize="small">
            brunoc.treinamentos@gmail.com
          </Text>
        </Box>
      )}
      <Avatar
        size="md"
        name="Bruno César"
        src="https://github.com/brunocesarr.png"
      />
    </Flex>
  );
}
