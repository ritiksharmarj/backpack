import { useState } from "react";
import { Pressable, Alert } from "react-native";

import { UI_RPC_METHOD_KEYRING_STORE_LOCK } from "@coral-xyz/common";
import { useBackgroundClient } from "@coral-xyz/recoil";
import {
  YGroup,
  Separator,
  StyledText,
  ListItemSettings,
} from "@coral-xyz/tamagui";
import { MaterialIcons } from "@expo/vector-icons";

import { BetterBottomSheet } from "~components/BottomSheetModal";
import { useTheme } from "~hooks/useTheme";

function ListItemSettingsLockWallet(): JSX.Element {
  const background = useBackgroundClient();
  return (
    <ListItemSettings
      title="Lock"
      iconName="lock"
      onPress={async () => {
        try {
          await background.request({
            method: UI_RPC_METHOD_KEYRING_STORE_LOCK,
            params: [],
          });
        } catch (error: any) {
          Alert.alert("Error locking wallet", error.message);
        }
      }}
    />
  );
}

export function SettingsList({ navigation }): JSX.Element {
  const handlePress = (route: string) => {
    navigation.push(route);
  };

  return (
    <YGroup
      overflow="hidden"
      borderWidth={2}
      borderColor="$borderFull"
      borderRadius="$container"
      separator={<Separator />}
    >
      <YGroup.Item>
        <ListItemSettings
          title="Wallets"
          iconName="account-balance-wallet"
          onPress={() => {
            handlePress("edit-wallets");
          }}
        />
      </YGroup.Item>
      <YGroup.Item>
        <ListItemSettings
          title="Account"
          iconName="account-circle"
          onPress={() => {
            handlePress("YourAccount");
          }}
        />
      </YGroup.Item>
      <YGroup.Item>
        <ListItemSettings
          title="Preferences"
          iconName="settings"
          onPress={() => {
            handlePress("Preferences");
          }}
        />
      </YGroup.Item>
      <YGroup.Item>
        <ListItemSettingsLockWallet />
      </YGroup.Item>
    </YGroup>
  );
}

export function AccountSettingsBottomSheet({ navigation }): JSX.Element {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <Pressable
        onPress={() => {
          setIsVisible(true);
        }}
        style={{ paddingHorizontal: 16 }}
      >
        <MaterialIcons
          name="settings"
          size={28}
          color={theme.custom.colors.fontColor}
        />
      </Pressable>
      <BetterBottomSheet
        isVisible={isVisible}
        resetVisibility={() => {
          setIsVisible(false);
        }}
      >
        <StyledText fontSize="$lg" fontWeight="$800" textAlign="center">
          Settings
        </StyledText>
        <SettingsList navigation={navigation} />
      </BetterBottomSheet>
    </>
  );
}
