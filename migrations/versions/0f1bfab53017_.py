"""empty message

Revision ID: 0f1bfab53017
Revises: 7763b2ef72a7
Create Date: 2022-06-28 17:46:18.467854

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0f1bfab53017'
down_revision = '7763b2ef72a7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('match_trip', sa.Column('read', sa.Boolean(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('match_trip', 'read')
    # ### end Alembic commands ###
