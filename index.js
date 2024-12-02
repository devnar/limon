const { Client: DiscordClient, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');
const { Client: BotpressClient } = require('@botpress/chat');

const DISCORD_TOKEN = ""; 
const BOTPRESS_WEBHOOK_ID = "";

const botpressApiUrl = `https://chat.botpress.cloud/${BOTPRESS_WEBHOOK_ID}`;
const discordClient = new DiscordClient({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

discordClient.once('ready', async () => {
    console.log('Discord bot is online!');

    try {
        const commands = [
            new SlashCommandBuilder()
                .setName('help')
                .setDescription('Learn how to use the bot.')
        ];

        const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

        await rest.put(
            Routes.applicationCommands(discordClient.user.id), // Burada hata alıyordunuz.
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error('Error refreshing commands:', error);
    }
});

discordClient.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'help') {
        await interaction.reply("**How to use Limon:**\n\nYou can ask Limon questions by mentioning the bot like this: `@limon [your message]`. Limon will respond with the best answers it can find! 🍋");
    }
});

discordClient.on('messageCreate', async (message) => {
    if (message.author.bot) return; // Bot mesajlarını görmezden gel

    if (message.mentions.has(discordClient.user)) {
        message.channel.sendTyping();
        const userMessage = message.content.slice(22);
        console.log(`User message: ${userMessage}`);
        
        console.log('Connecting to Botpress...');
        const botpressResponse = await sendMessageToBotpress(userMessage);
        message.reply(botpressResponse);
    }

    if (message.content.startsWith('/help')) {
        message.reply("**How to use Limon:**\n\nYou can ask Limon questions by mentioning the bot like this: `@limon [your message]`. Limon will respond with the best answers it can find! 🍋");
    }
});

const sendMessageToBotpress = async (messageContent) => {
    try {
        const client = new BotpressClient({ apiUrl: botpressApiUrl });

        // Kullanıcı oluştur
        const { user, key } = await client.createUser({});
        if (!user || !key) {
            throw new Error('Failed to create user or retrieve user key');
        }
        console.log(`User Id: ${user.id}`);

        // Konuşma oluştur
        const { conversation } = await client.createConversation({ 'x-user-key': key });
        if (!conversation) {
            throw new Error('Failed to create conversation');
        }
        console.log(`Conversation Id: ${conversation.id}`);

        // Mesaj gönder
        const { message: sentMessage } = await client.createMessage({ 
            payload: { type: 'text', text: messageContent }, 
            'x-user-key': key, 
            conversationId: conversation.id 
        });
        if (!sentMessage) {
            throw new Error('Failed to send message or retrieve sent message');
        }
        console.log(`Sent Message Id: ${sentMessage.id}`);

        // Botpress'ten yanıt bekle
        await new Promise(resolve => setTimeout(resolve, 5000)); // Bekleme süresini artır

        // Mesajları listele
        const { messages } = await client.listConversationMessages({ 
            id: conversation.id, 
            'x-user-key': key 
        });
        if (!messages || messages.length === 0) {
            throw new Error('No messages found in conversation');
        }

        // Tüm mesajları hata ayıklama için kaydet
        console.log('All messages in conversation:', messages);

        // Bot yanıtını bul (son mesajın botdan geldiğini varsay)
        const botResponse = messages
            .filter(msg => msg.payload.type === 'text' && msg.payload.text !== messageContent)
            .pop(); // Son bot mesajını al

        if (!botResponse) {
            throw new Error('Bot did not provide a valid response');
        }

        console.log(`Bot response: ${botResponse.payload.text}`);
        return botResponse.payload.text || 'No response from Botpress';
    } catch (error) {
        console.error('Error communicating with Botpress:', error);
        return 'Failed to get a response';
    }
};

discordClient.login(DISCORD_TOKEN);