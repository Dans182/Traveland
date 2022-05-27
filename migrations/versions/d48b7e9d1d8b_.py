"""empty message

Revision ID: d48b7e9d1d8b
Revises: 51811aefd7d5
Create Date: 2022-05-26 19:01:42.219136

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd48b7e9d1d8b'
down_revision = '51811aefd7d5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('trip', sa.Column('totaltravelers', sa.Integer(), nullable=False))
    op.drop_column('trip', 'people')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('trip', sa.Column('people', sa.INTEGER(), autoincrement=False, nullable=False))
    op.drop_column('trip', 'totaltravelers')
    # ### end Alembic commands ###