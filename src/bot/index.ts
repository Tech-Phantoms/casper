import { Probot } from 'probot';
import Axios from 'axios';

function bot(app: Probot) {
  app.on('issues.opened', async (context) => {
    const issueComment = context.issue({
      body: `Thanks for opening this issue! `,
    });
    await context.octokit.issues.createComment(issueComment);
  });
  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/


  app.on('organization.member_added', async (context) => {
    await Axios({
      url: process.env.DISCORD_NEW_USER,
      method: 'POST',
      data: {
        content: `${context.payload.membership.user.login} joined the Organization`
      }
    })
  })
}

export default bot;
