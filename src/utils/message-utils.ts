export function buildMessage(cronjob: any) {
  const firstName = cronjob.user.firstName;
  const lastName = cronjob.user.lastName;
  const type = cronjob.name.split('_')[1].toUpperCase(); // example: Bob_birthday_message
  const messageMap = {
    BIRTHDAY: `Hey, ${firstName} ${lastName} it's your birthday`,
    ANNIVERSARY: `Hey, ${firstName} ${lastName} it's your anniversary`,
  };

  return messageMap[type];
}
